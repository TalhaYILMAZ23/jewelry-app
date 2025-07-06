import React from 'react';
import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxRating = 5, 
  size = 'medium',
  showValue = true 
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const renderStar = (type: 'full' | 'half' | 'empty', index: number) => {
    return (
      <span 
        key={index} 
        className={`${styles.star} ${styles[size]} ${styles[type]}`}
      >
        {type === 'full' && '★'}
        {type === 'half' && '☆'}
        {type === 'empty' && '☆'}
      </span>
    );
  };

  return (
    <div className={styles.starRating}>
      <div className={styles.stars}>
        {/* Full stars */}
        {Array.from({ length: fullStars }, (_, i) => 
          renderStar('full', i)
        )}
        
        {/* Half star */}
        {hasHalfStar && renderStar('half', fullStars)}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }, (_, i) => 
          renderStar('empty', fullStars + (hasHalfStar ? 1 : 0) + i)
        )}
      </div>
      
      {showValue && (
        <span className={styles.ratingValue}>
          {rating.toFixed(1)}/{maxRating}
        </span>
      )}
    </div>
  );
};
