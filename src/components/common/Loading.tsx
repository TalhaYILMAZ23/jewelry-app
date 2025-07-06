import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  overlay?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  text = 'Loading...',
  overlay = false 
}) => {
  const content = (
    <div className={`${styles.loading} ${styles[size]}`}>
      <div className={styles.spinner}>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className={styles.overlay}>
        {content}
      </div>
    );
  }

  return content;
};
