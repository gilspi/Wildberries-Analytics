from typing import Union, Optional
from pydantic import BaseModel


class ProductSaleInfo(BaseModel):
    id: Union[int]
    name: Optional[str]
    price: Union[int]
    sale_price: Union[int]
    rating: Union[float]
    reviews: Union[int]

    class Config:
        from_attributes = True

