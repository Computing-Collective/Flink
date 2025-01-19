from fastapi import FastAPI
from contextlib import asynccontextmanager

import app.database as db
import app.routes.main as api
from app.models import *


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(api.api_router)
