from fastapi import FastAPI
from app.db.session import engine
from app.db.base import Base
from routes.reservas_route import router as reservas_router
from routes.canchas_route import router as canchas_router
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes, o puedes especificar dominios específicos
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)


def startup():
    Base.metadata.create_all(bind=engine)

app.add_event_handler("startup", startup)

@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(reservas_router)
app.include_router(canchas_router)
