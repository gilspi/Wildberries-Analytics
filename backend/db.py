from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Base
from schemas import db_settings


engine = create_engine(db_settings.db_url, echo=True, connect_args={"check_same_thread": False})
session_factory = sessionmaker(autoflush=False, bind=engine)


class Database:

    @staticmethod
    def create_tables():
        Base.metadata.drop_all(engine)
        Base.metadata.create_all(engine)


if __name__ == "__main__":
    Database.create_tables()