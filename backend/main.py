from typing import List, Optional

from fastapi import FastAPI, Query, Depends
from fastapi.middleware.cors import CORSMiddleware

from db import session_factory
from models import Product
from schemas import ProductSaleInfo


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    session = session_factory()
    try:
        yield session
    finally:
        session.close()


@app.get("/api/products/", response_model=List[ProductSaleInfo])
def get_products(
    min_price: int = Query(0, ge=0),
    max_price: Optional[int] = Query(None, ge=0),
    min_rating: float = Query(0, ge=0, le=5),
    max_rating: Optional[float] = Query(None, ge=0, le=5),
    min_reviews: int = Query(0, ge=0),
    max_reviews: Optional[int] = Query(None, ge=0),
    session = Depends(get_db)
):
    query = session.query(Product)
    query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    query = query.filter(Product.rating >= min_rating)
    if max_rating is not None:
        query = query.filter(Product.rating <= max_rating)
    query = query.filter(Product.reviews >= min_reviews)
    if max_reviews is not None:
        query = query.filter(Product.reviews <= max_reviews)
    return query.all()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=3000)