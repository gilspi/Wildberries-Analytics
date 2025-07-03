import React from 'react';
import { Box, Slider, Typography, TextField } from '@mui/material';

interface FiltersProps {
  minPrice: number;
  maxPrice: number;
  priceRange: number[];
  onPriceChange: (event: Event, newValue: number | number[]) => void;
  minRating: number;
  onMinRatingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minReviews: number;
  onMinReviewsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters: React.FC<FiltersProps> = ({
  minPrice,
  maxPrice,
  priceRange,
  onPriceChange,
  minRating,
  onMinRatingChange,
  minReviews,
  onMinReviewsChange,
}) => {
  return (
    <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, mb: 2 }}>
      <Typography gutterBottom>Диапазон цен (₽)</Typography>
      <Slider
        value={priceRange}
        onChange={onPriceChange}
        valueLabelDisplay="auto"
        min={minPrice}
        max={maxPrice}
        sx={{ width: 250 }}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <TextField
        label="Мин. рейтинг"
        type="number"
        InputProps={{ inputProps: { step: 0.1, min: 0, max: 5 } }}
        value={minRating}
        onChange={onMinRatingChange}
        size="small"
        />
        <TextField
        label="Мин. отзывов"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        value={minReviews}
        onChange={onMinReviewsChange}
        size="small"
        />
      </Box>
    </Box>
  );
};

export default Filters; 