import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Filters from './components/Filters';
import ProductsTable, { Product } from './components/ProductsTable';
import PriceHistogram from './components/PriceHistogram';
import DiscountVsRating from './components/DiscountVsRating';
import axios from 'axios';

function App() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [minReviews, setMinReviews] = useState(0);

  const [products, setProducts] = useState<Product[]>([]);
  const [sortKey, setSortKey] = useState<keyof Product>('rating');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const fetchProducts = useCallback(() => {
    const params: any = {
      min_price: priceRange[0],
      max_price: priceRange[1],
      min_rating: minRating,
      min_reviews: minReviews,
    };
    axios.get<Product[]>('http://127.0.0.1:8000/api/products/', { params })
      .then(res => {
        let data = res.data;
        data = [...data].sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return order === 'asc' ? -1 : 1;
          if (a[sortKey] > b[sortKey]) return order === 'asc' ? 1 : -1;
          return 0;
        });
        setProducts(data);
      });
  }, [priceRange, minRating, minReviews, sortKey, order]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSort = (key: keyof Product) => {
    if (sortKey === key) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setOrder('asc');
    }
  };

  return (
    <div className="App">
      <h1>Wildberries Analytics</h1>
      <div style={{ display: 'flex', gap: 32 }}>
        <div style={{ flex: 2 }}>
          <section>
            <h2>Фильтры</h2>
            <Filters
              minPrice={0}
              maxPrice={100000}
              priceRange={priceRange}
              onPriceChange={(_, v) => setPriceRange(v as [number, number])}
              minRating={minRating}
              onMinRatingChange={e => setMinRating(Number(e.target.value))}
              minReviews={minReviews}
              onMinReviewsChange={e => setMinReviews(Number(e.target.value))}
            />
          </section>
          <section>
            <h2>Товары</h2>
            <ProductsTable
              products={products}
              sortKey={sortKey}
              order={order}
              onSort={handleSort}
            />
          </section>
        </div>
        <div style={{ flex: 1 }}>
          <section>
            <h2>Графики</h2>
            <PriceHistogram products={products} />
            <DiscountVsRating products={products} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App; 