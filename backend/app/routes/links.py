import urllib.parse as urlparse
from urllib.parse import urlencode
from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
from sqlmodel import select

import app.database as db
from app.models import *

router = APIRouter(tags=["links"])


@router.post("/create_link", response_model=LinkPublic)
def create_link(link: LinkCreate, session: db.SessionDep):
    try:
        db_link = db.create_link(session=session, link=link)
        return LinkPublic.model_validate(db_link)
    except:
        raise HTTPException(status_code=400, detail="Invalid link data")


@router.get("/links", response_model=LinksPublic)
def all_links(session: db.SessionDep) -> LinksPublic:
    links = session.exec(select(Link)).all()
    return LinksPublic(data=links, count=len(links))


@router.get("/links/{user_id}", response_model=LinksPublic)
def user_links(user_id: uuid.UUID, session: db.SessionDep) -> LinksPublic:
    links = session.exec(select(Link).where(Link.user_id == user_id)).all()
    return LinksPublic(data=links, count=len(links))


@router.get("/link/{code}")
def get_link(code: str, session: db.SessionDep):
    link = session.exec(select(Link).where(Link.code == code)).first()
    if not link:
        return RedirectResponse(url="/")
    url_parts = list(urlparse.urlparse(link.redirect_url))
    query = dict(urlparse.parse_qsl(url_parts[4]))
    query.update({"code": link.code})

    url_parts[4] = urlencode(query)
    return RedirectResponse(urlparse.urlunparse(url_parts))


@router.delete("/link/{code}")
def delete_link(code: str, session: db.SessionDep):
    link = session.exec(select(Link).where(Link.code == code)).first()
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    session.delete(link)
    session.commit()
    return {"message": "Link deleted"}


@router.get("/link/{code}/decode", response_model=LinkDecode)
def get_link_info(code: str, session: db.SessionDep):
    link = session.exec(select(Link).where(Link.code == code)).first()
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    return LinkDecode(website_text=link.website_text)
