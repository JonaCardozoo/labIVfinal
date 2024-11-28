from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from crud.CanchasCrud import create_cancha
from schemas.Canchas import CanchaCreate, Cancha

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/canchas/", response_model=Cancha)
def create_cancha_route(reserva: CanchaCreate, db: Session = Depends(get_db)):
    return create_cancha(db, reserva)
