import React from 'react';
import '../assets/styles/SkeletonProductLoader.css'; // Asegúrate de tener esta hoja de estilos

const SkeletonProductLoader: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-category"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-sales"></div>
        <div className="skeleton-rating">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="skeleton-star"></div>
            ))}
        </div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};

export default SkeletonProductLoader;
