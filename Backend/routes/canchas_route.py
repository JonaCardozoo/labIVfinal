from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from crud.CanchasCrud import create_cancha
from schemas.Canchas import CanchaCreate, Cancha
from crud.CanchasCrud import get_cancha,get_cancha_id

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/canchas/", response_model=list[Cancha])
def read_canchas_route(db: Session = Depends(get_db)):
    return get_cancha(db)

@router.get("/canchas/{cancha_id}", response_model=Cancha)
def read_cancha_route(cancha_id: int, db: Session = Depends(get_db)):
    return get_cancha_id(db, cancha_id)

@router.post("/canchas/", response_model=Cancha)
def create_cancha_route(reserva: CanchaCreate, db: Session = Depends(get_db)):
    return create_cancha(db, reserva)
