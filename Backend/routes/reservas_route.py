from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from schemas.Reservas import ReservaCreate, Reserva
from crud.ReservaCrud import delete_reserva,modify_reserva,get_reserva_id,get_reserva,create_reserva as create_reserva_crud


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/reservas/", response_model=list[Reserva])
def read_reservas_route(db: Session = Depends(get_db)):
    return get_reserva(db)


@router.get("/reservas/{reserva_id}", response_model=Reserva)
def read_reserva_route(reserva_id: int, db: Session = Depends(get_db)):
    return get_reserva_id(db, reserva_id)

@router.post("/reservas/", response_model=Reserva)
def create_reserva_route(reserva: ReservaCreate, db: Session = Depends(get_db)):
    return create_reserva_crud(db, reserva)

@router.delete("/reservas/{reserva_id}", response_model=Reserva)
def delete_reserva_route(reserva_id: int, db: Session = Depends(get_db)):
    return delete_reserva(db, reserva_id)

@router.put("/reservas/{reserva_id}", response_model=Reserva)
def modifiy_reserva_route(reserva_id: int, reserva: ReservaCreate, db: Session = Depends(get_db)):
    return modify_reserva(db, reserva_id, reserva) 
