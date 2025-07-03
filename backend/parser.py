import requests
from db import session_factory
from models import Product


def parse_wildberries(query: str, pages: int = 1):
    base_url = f"https://search.wb.ru/exactmatch/ru/common/v4/search"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    with session_factory() as session:
        for page in range(1, pages + 1):
            params = {
                "query": query,
                "resultset": "catalog",
                "sort": "popular",
                "spp": 30,
                "limit": 100,
                "page": page,
                "dest": "12358235",
                "regions": "80,64,38,4,83,33,70,86,75,30,69,1,22,66,31,40,68,71",
                "appType": "1"
            }

            resp = requests.get(base_url, headers=headers, params=params)
            if resp.status_code != 200:
                print(f"Error: {resp.status_code}")
                continue

            data = resp.json()
            print(data)
            products = data.get("data", {}).get("products", [])
            print(products)

            for item in products:
                try:
                    name = item.get("name", "")
                    price = item.get("priceU", 0) // 100  # в копейках
                    sale_price = item.get("salePriceU", price * 100) // 100
                    rating = float(item.get("rating", 0))
                    reviews = item.get("feedbacks", 0)
                    print(f"Parsed: {name}, price: {price}, sale: {sale_price}, rating: {rating}, reviews: {reviews}")
                    product = Product(
                        name=name,
                        price=price,
                        sale_price=sale_price,
                        rating=rating,
                        reviews=reviews
                    )
                    session.add(product)
                except Exception as e:
                    print(f"Error parsing product: {e}")
            session.commit()


if __name__ == "__main__":
    parse_wildberries("планшет", pages=3)
