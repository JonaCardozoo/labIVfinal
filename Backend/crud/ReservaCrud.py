# crud/reserva.py
from sqlalchemy.orm import Session
from models.reserva import Reserva
from schemas.Reservas import ReservaCreate

def create_reserva(db: Session, reserva: ReservaCreate):
    # Verificar si ya existe una reserva en la misma cancha en el mismo horario
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
