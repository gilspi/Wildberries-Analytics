from typing import Union, Optional

from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


class ProductSaleInfo(BaseModel):
    id: Union[int]
    name: Optional[str]
    price: Union[int]
    sale_price: Union[int]
    rating: Union[float]
    reviews: Union[int]

    class Config:
        from_attributes = True

class DatabaseSettings(BaseSettings):
    DATABASE_URL: str

    @property
    def db_url(self) -> str:
        return f"{self.DATABASE_URL}"

    model_config = SettingsConfigDict(env_file=".env")


db_settings = DatabaseSettings()
