import urllib.parse as urlparse
from urllib.parse import urlencode
from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from sqlmodel import select

import app.database as db
from app.models import *

router = APIRouter(tags=["links"])


@router.post("/create_link")
def create_link(link: LinkCreate, session: db.SessionDep):
    db_link = db.create_link(session=session, link=link)
    return LinkPublic.model_validate(db_link)


@router.get("/links", response_model=LinksPublic)
def all_links(session: db.SessionDep) -> LinksPublic:
    links = session.exec(select(Link)).all()
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
