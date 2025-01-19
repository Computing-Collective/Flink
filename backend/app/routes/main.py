from fastapi import APIRouter

from app.routes import core, links, users

api_router = APIRouter()
api_router.include_router(core.router)
api_router.include_router(links.router)
api_router.include_router(users.router)
