# crud/reserva.py
from sqlalchemy import and_, extract, or_
from sqlalchemy.orm import Session
from models.reserva import Reserva
from schemas.Reservas import ReservaCreate
from fastapi import HTTPException
from sqlalchemy.sql import extract

def get_reserva(db: Session):
    return db.query(Reserva).all()
    

def get_reserva_id(db: Session, reserva_id: int):
    reserva = db.query(Reserva).filter(Reserva.id == reserva_id).first()
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return reserva

from sqlalchemy.sql import and_, or_, extract

def create_reserva(db: Session, reserva: ReservaCreate):


    if verificar_reserva(db, reserva):
        raise ValueError("Ya existe una reserva en esa cancha para ese horario.")


    db_reserva = Reserva(
        cancha_id=reserva.cancha_id,
        fecha=reserva.fecha,
        hora=reserva.hora,
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
    
    
    if verificar_reserva(db, reserva_data):
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


def verificar_reserva(db: Session, reserva: ReservaCreate):
    inicio_minutos = reserva.hora.hour * 60 + reserva.hora.minute
    fin_minutos = inicio_minutos + reserva.duracion * 60

    existing_reserva = db.query(Reserva).filter(
        Reserva.cancha_id == reserva.cancha_id,
        Reserva.fecha == reserva.fecha,
        or_(
            and_(
                (extract('hour', Reserva.hora) * 60 + extract('minute', Reserva.hora)) < fin_minutos,
                (extract('hour', Reserva.hora) * 60 + extract('minute', Reserva.hora) + Reserva.duracion * 60) > inicio_minutos
            )
        )
    ).first()

    return existing_reserva

    
    