# crud/Cancha.py
from sqlalchemy.orm import Session
from models.canchas import Cancha  
from schemas.Canchas import CanchaCreate  

def create_cancha(db: Session, cancha: CanchaCreate):
    db_cancha = Cancha(
        nombre=cancha.nombre,
        techada=cancha.techada
    )
    
    db.add(db_cancha)
    db.commit()
    db.refresh(db_cancha)
    
    return db_cancha
