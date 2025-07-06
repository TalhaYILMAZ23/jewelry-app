import React, { useState, useEffect } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Loading } from '../common/Loading';
import { useProducts } from '../../hooks/useProducts';
import styles from './ProductList.module.css';

interface ProductListProps {
  filters?: {
    price_min?: number;
    price_max?: number;
    popularity_min?: number;
    popularity_max?: number;
  };
}

export const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  const { products, loading, error, refetch } = useProducts(filters);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);
  
  // Ekran boyutuna göre itemsPerView ayarla
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setItemsPerView(1); // Small mobile: 1 kart
      } else if (width <= 768) {
        setItemsPerView(2); // Mobile: 2 kart
      } else if (width <= 1024) {
        setItemsPerView(3); // Tablet: 3 kart
      } else {
        setItemsPerView(4); // Desktop: 4 kart
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Infinite carousel için kartları çoğalt
  const getExtendedProducts = () => {
    if (products.length === 0) return [];
    
    // Başa ve sona extra kartlar ekle
    const extendedProducts = [
      ...products.slice(-itemsPerView), // Son kartları başa ekle
      ...products, // Orijinal kartlar
      ...products.slice(0, itemsPerView) // İlk kartları sona ekle
    ];
    
    return extendedProducts;
  };

  const extendedProducts = getExtendedProducts();
  const totalSlides = products.length;

  // Başlangıç pozisyonunu ayarla (ilk gerçek kartlarda başla)
  useEffect(() => {
    if (products.length > 0) {
      setCurrentIndex(itemsPerView);
    }
  }, [products.length, itemsPerView]);

  const handlePrev = () => {
    if (isAnimating || products.length === 0) return;
    
    setIsAnimating(true);
    const newIndex = currentIndex - 1; // Her seferinde 1 kart kaydır
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      // Eğer başa geldiyse, animasyon olmadan sona geç
      if (newIndex <= 0) {
        setCurrentIndex(totalSlides);
      }
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating || products.length === 0) return;
    
    setIsAnimating(true);
    const newIndex = currentIndex + 1; // Her seferinde 1 kart kaydır
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      // Eğer sona geldiyse, animasyon olmadan başa geç
      if (newIndex >= totalSlides + itemsPerView) {
        setCurrentIndex(itemsPerView);
      }
      setIsAnimating(false);
    }, 500);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Ürünler yüklenirken hata oluştu: {error}</p>
        <button onClick={refetch} className={styles.retryButton}>
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return <div>Ürün bulunamadı</div>;
  }

  return (
    <div className={styles.container}>
      <button 
        onClick={handlePrev}
        className={`${styles.leftButton} ${isAnimating ? styles.animating : ''}`}
        disabled={isAnimating}
      >
        ‹
      </button>

      <div className={styles.cardsContainer}>
        <div 
          className={styles.cardsWrapper}
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            transition: isAnimating ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        >
          {extendedProducts.map((product, index) => (
            <div 
              key={`${product._id}-${index}`} 
              className={styles.cardWrapper}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={handleNext}
        className={`${styles.rightButton} ${isAnimating ? styles.animating : ''}`}
        disabled={isAnimating}
      >
        ›
      </button>
    </div>
  );
};
