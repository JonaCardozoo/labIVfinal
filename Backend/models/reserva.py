from sqlalchemy import Column, Integer, String, ForeignKey, Date, Time
from app.db.base import Base
from sqlalchemy.orm import relationship

class Reserva(Base):
    __tablename__ = "reservas"
    
    id = Column(Integer, primary_key=True, index=True)
    dia = Column(Date, nullable=False)
    duracion = Column(Time, nullable=False)
    telefono = Column(String, nullable=False)
    nombre_contacto = Column(String, nullable=False)
    cancha_id = Column(Integer, ForeignKey('canchas.id'), nullable=False)

    cancha = relationship("Cancha", back_populates="reservas")
