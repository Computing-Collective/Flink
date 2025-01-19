from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine, select

from app.models import *
from app.genai import generate_website_text
from app.security import get_password_hash, verify_password


sqlite_file_name = "instance/database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def create_user(*, session: Session, user: UserCreate) -> User:
    db_user = User.model_validate(
        user, update={"hashed_password": get_password_hash(user.password)}
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def create_link(*, session: Session, link: LinkCreate) -> Link:
    db_link = Link.model_validate(link)
    session.add(db_link)
    session.commit()
    session.refresh(db_link)
    db_link.website_text = generate_website_text(
        db_link.source_url, db_link.user.name, db_link.product
    )
    session.add(db_link)
    session.commit()
    session.refresh(db_link)
    return db_link
