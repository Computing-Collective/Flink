import uuid

from pydantic import EmailStr
from sqlmodel import Field, SQLModel, Relationship


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(index=True, unique=True, max_length=255)
    name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    links: list["Link"] = Relationship(back_populates="user", cascade_delete=True)


class UserLogin(UserBase):
    password: str


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Shared properties
class LinkBase(SQLModel):
    code: str = Field(
        unique=True,
        min_length=4,
        max_length=8,
        default_factory=lambda: str(uuid.uuid4())[:4],
    )
    source_url: str = Field(max_length=2083)
    redirect_url: str = Field(max_length=2083)
    product: str = Field(max_length=255)
    website_text: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class LinkCreate(LinkBase):
    user_id: uuid.UUID


# Properties to receive via API on update, all are optional
class LinkUpdate(LinkBase):
    pass


# Database model, database table inferred from class name
class Link(LinkBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    user: User | None = Relationship(back_populates="links")


# Properties to return via API, id is always required
class LinkPublic(LinkBase):
    id: uuid.UUID
    user_id: uuid.UUID


class LinksPublic(SQLModel):
    data: list[LinkPublic]
    count: int
