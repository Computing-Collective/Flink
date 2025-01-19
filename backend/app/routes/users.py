from fastapi import APIRouter, HTTPException
from sqlmodel import select

import app.database as db
from app.models import *

router = APIRouter(tags=["users"])


@router.post("/login", response_model=UserPublic)
def login(user: UserLogin, session: db.SessionDep):
    db_user = db.authenticate(session=session, email=user.email, password=user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return UserPublic.model_validate(db_user)


@router.post("/signup", response_model=UserPublic)
def signup(user: UserCreate, session: db.SessionDep):
    test_user = db.get_user_by_email(session=session, email=user.email)
    if test_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    try:
        db_user = db.create_user(session=session, user=user)
    except:
        raise HTTPException(status_code=400, detail="Invalid user data")
    return UserPublic.model_validate(db_user)


@router.get("/users", response_model=UsersPublic)
def all_users(session: db.SessionDep) -> UsersPublic:
    users = session.exec(select(User)).all()
    return UsersPublic(data=users, count=len(users))
