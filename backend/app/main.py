from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

import app.database as db
import app.routes.main as api
from app.models import *


logging.getLogger("passlib").setLevel(logging.ERROR)


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.create_db_and_tables()
    yield


origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8080",
    "https://speaker-search.myshopify.com",
]


app = FastAPI(lifespan=lifespan)
app.include_router(api.api_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
