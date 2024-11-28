from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+psycopg2://postgres:123@localhost/tplabIV"
    
    class Config:
        env_file = ".env"

settings = Settings()
