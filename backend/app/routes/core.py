from fastapi import APIRouter


router = APIRouter(tags=["core"])


@router.get("/")
@router.get("/status")
def read_root():
    return {"status": "OK"}
