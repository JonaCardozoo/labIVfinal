from pydantic import BaseModel
from datetime import datetime

class ReservaBase(BaseModel):
    dia: datetime
    duracion: int
    telefono: str
    nombre_contacto: str
    cancha_id: int
class ReservaCreate(ReservaBase):
    pass

class Reserva(ReservaBase):
    id: int

    class Config:
        orm_mode = True
