# crud/Cancha.py
from sqlalchemy.orm import Session
from models.canchas import Cancha  
from schemas.Canchas import CanchaCreate  
from fastapi import HTTPException


def get_cancha(db:Session):
    return db.query(Cancha).all()

def get_cancha_id(db:Session, cancha_id:int):
    cancha = db.query(Cancha).filter(Cancha.id == cancha_id).first()
    if not cancha:
        raise HTTPException(status_code=404, detail="Cancha no encontrada")
    return cancha

def create_cancha(db: Session, cancha: CanchaCreate):
    db_cancha = Cancha(
        id=cancha.id,
        nombre=cancha.nombre,
        techada=cancha.techada
    )
    
    db.add(db_cancha)
    db.commit()
    db.refresh(db_cancha)
    
    return db_cancha



def delete_cancha(db: Session, cancha_id: int):
    cancha = db.query(Cancha).filter(Cancha.id == cancha_id).first()
    if not cancha:
        raise HTTPException(status_code=404, detail="Cancha no encontrada")
    db.delete(cancha)
    db.commit()
    return cancha
