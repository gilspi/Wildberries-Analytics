import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Product } from './ProductsTable';

interface Props {
  products: Product[];
}

const PriceHistogram: React.FC<Props> = ({ products }) => {
  const bins = [0, 10000, 20000, 30000, 40000, 50000];
  const data = bins.map((min, index) => {
    const max = bins[index + 1] ?? Infinity;
    const count = products.filter(p => p.price >= min && p.price < max).length;
    return {
      range: max === Infinity ? `${min}+` : `${min / 1000}–${max / 1000}k`,
      count,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PriceHistogram;
