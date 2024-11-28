from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from crud.ReservaCrud import create_reserva
from schemas.Reservas import ReservaCreate, Reserva

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/reservas/", response_model=Reserva)
def create_reserva(reserva: ReservaCreate, db: Session = Depends(get_db)):
    return create_reserva.create_reserva(db, reserva)
