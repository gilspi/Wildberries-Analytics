import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Product } from './ProductsTable';

interface Props {
  products: Product[];
}

const DiscountVsRating: React.FC<Props> = ({ products }) => {
  const data = products.map(p => ({
    rating: p.rating,
    discount: p.price - p.sale_price,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <XAxis dataKey="rating" name="Рейтинг" />
        <YAxis dataKey="discount" name="Скидка" />
        <Tooltip />
        <Scatter data={data} fill="#d32f2f" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default DiscountVsRating;
