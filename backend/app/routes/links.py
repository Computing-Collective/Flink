from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from sqlmodel import select
import app.database as db
from app.models import *

router = APIRouter(tags=["links"])


@router.post("/create_link")
def create_link(link: LinkCreate, session: db.SessionDep):
    website_text = "PLACEHOLDER"
    db_link = Link(**link.model_dump())
    db_link.website_text = website_text
    # db_link = Link(source_url=link.source_url, code=link.code, website_text=website_text, user_id=link.user_id, product=link.product, redirect_url=link.redirect_url)
    session.add(db_link)
    session.commit()
    session.refresh(db_link)
    return {"id": db_link.id}


@router.get("/links", response_model=LinksPublic)
def all_links(session: db.SessionDep) -> LinksPublic:
    links = session.exec(select(Link)).all()
    return LinksPublic(data=links, count=len(links))


@router.get("/link/{code}")
def get_link(code: str, session: db.SessionDep):
    # look up link in db with code
    # then redirect to associated url with our query params
    link = session.exec(select(Link).where(Link.code == code)).first()
    return RedirectResponse(url=f"{link.url}?our_code={link.code}")
