from fastapi import FastAPI
from app.db.session import engine
from app.db.base import Base
from routes.reservas_route import router as reservas_router
from routes.canchas_route import router as canchas_router

app = FastAPI()

def startup():
    Base.metadata.create_all(bind=engine)

app.add_event_handler("startup", startup)

@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(reservas_router)
app.include_router(canchas_router)
