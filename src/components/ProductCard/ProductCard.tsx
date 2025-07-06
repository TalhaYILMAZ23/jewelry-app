import React, { useState } from 'react';
import { type Product, type ColorType } from '../../types';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { StarRating } from '../StarRating/StarRating';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<ColorType>('yellow');

  const handleColorChange = (color: ColorType) => {
    setSelectedColor(color);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img 
          src={product.images[selectedColor]} 
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.name}</h3>
        <p className={styles.productPrice}>{formatPrice(product.price)} USD</p>
        
        <div className={styles.colorSection}>
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
          />
        </div>
        
        <div className={styles.ratingSection}>
          <StarRating rating={product.rating} showValue={false} />
          <span className={styles.ratingText}>{product.rating.toFixed(1)}/5</span>
        </div>
      </div>
    </div>
  );
};
