# crud/reserva.py
from sqlalchemy.orm import Session
from models.reserva import Reserva
from schemas.Reservas import ReservaCreate
from fastapi import HTTPException


def get_reserva(db: Session):
    return db.query(Reserva).all()
    

def get_reserva_id(db: Session, reserva_id: int):
    reserva = db.query(Reserva).filter(Reserva.id == reserva_id).first()
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return reserva

def create_reserva(db: Session, reserva: ReservaCreate):
    existing_reserva = db.query(Reserva).filter(
        Reserva.cancha_id == reserva.cancha_id,
        Reserva.dia == reserva.dia
    ).first()
    
    if existing_reserva:
        raise ValueError("Ya existe una reserva en esa cancha para ese horario.")
    
    # Crear la nueva reserva
    db_reserva = Reserva(
        cancha_id=reserva.cancha_id,
        dia=reserva.dia,
        duracion=reserva.duracion,
        telefono=reserva.telefono,
        nombre_contacto=reserva.nombre_contacto
    )
    db.add(db_reserva)
    db.commit()
    db.refresh(db_reserva)
    return db_reserva

def delete_reserva(db: Session, reserva_id: int):
    reserva = db.query(Reserva).filter(Reserva.id == reserva_id).first()
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    db.delete(reserva)
    db.commit()
    return reserva


def modify_reserva(db: Session, reserva_id: int, reserva_data: ReservaCreate):
    existing_reserva = db.query(Reserva).filter(
        Reserva.cancha_id == reserva.cancha_id,
        Reserva.dia == reserva.dia
    ).first()
    
    if existing_reserva:
        raise ValueError("Ya existe una reserva en esa cancha para ese horario.")
    
    reserva = db.query(Reserva).filter(Reserva.id == reserva_id).first()
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")

    reserva.cancha_id = reserva_data.cancha_id
    reserva.dia = reserva_data.dia
    reserva.duracion = reserva_data.duracion
    reserva.telefono = reserva_data.telefono
    reserva.nombre_contacto = reserva_data.nombre_contacto

   
    db.commit()
    db.refresh(reserva) 
    return reserva
    