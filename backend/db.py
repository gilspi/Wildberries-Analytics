from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from config import DATABASE_URL
from models import Base


engine = create_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})
Session = sessionmaker(autoflush=False, bind=engine)


class Database:

    @staticmethod
    def create_tables():
        Base.metadata.drop_all(engine)
        Base.metadata.create_all(engine)


if __name__ == "__main__":
    Database.create_tables()