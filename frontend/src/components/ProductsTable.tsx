import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

export interface Product {
  id: number;
  name: string;
  price: number;
  sale_price: number;
  rating: number;
  reviews: number;
}

type Order = 'asc' | 'desc';

type SortKey = keyof Product;

interface ProductsTableProps {
  products: Product[];
  sortKey: SortKey;
  order: Order;
  onSort: (key: SortKey) => void;
}

const columns: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Название товара' },
  { key: 'price', label: 'Цена' },
  { key: 'sale_price', label: 'Цена со скидкой' },
  { key: 'rating', label: 'Рейтинг' },
  { key: 'reviews', label: 'Количество отзывов' },
];

const ProductsTable: React.FC<ProductsTableProps> = ({ products, sortKey, order, onSort }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map(col => (
              <TableCell key={col.key as string}>
                <TableSortLabel
                  active={sortKey === col.key}
                  direction={sortKey === col.key ? order : 'asc'}
                  onClick={() => onSort(col.key)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.sale_price}</TableCell>
              <TableCell>{row.rating}</TableCell>
              <TableCell>{row.reviews}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable; 