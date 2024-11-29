from pydantic import BaseModel


class CanchaBase(BaseModel):
    nombre: str
    techada: bool

class CanchaCreate(CanchaBase):
    pass

class Cancha(CanchaBase):
    id: int

    class Config:
        from_attributes = True
