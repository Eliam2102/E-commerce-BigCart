import React, { useState, useEffect } from "react";
import "../assets/styles/CarouselPromotions.css";
import img1 from "../assets/img/banner1.svg";
import img2 from "../assets/img/banner2.svg";
import img3 from "../assets/img/banner3.svg";
import img4 from "../assets/img/banner4.svg";
import img5 from "../assets/img/banner5.svg";

const images: string[] = [img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5,img1, img2, img3, img4, img5,img1, img2, img3, img4, img5,img1, img2, img3, img4, img5,img1, img2, img3, img4, img5,img1, img2, img3, img4, img5,img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5 ]; 
const CarouselPromotions: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container-prom">
      {/* Track del carrusel */}
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Botón Prev */}
      <button
        className="carousel-button prev"
        onClick={handlePrev}
        aria-label="Anterior"
      >
        &#8249;
      </button>

      {/* Botón Next */}
      <button
        className="carousel-button next"
        onClick={handleNext}
        aria-label="Siguiente"
      >
        &#8250;
      </button>
    </div>
  );
};

export default CarouselPromotions;

