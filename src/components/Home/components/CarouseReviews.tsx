// ReviewCarousel.jsx
import React, { useState } from "react";
import "../assets/styles/CarouselReviews.css";

const reviewsData = [
    {
      avatar: "https://i.postimg.cc/GpmPJxpX/mARIANA.webp",
      name: "Mariana López",
      time: "Hace 2 semanas",
      review: "El producto llegó a tiempo y en perfectas condiciones. La calidad supera mis expectativas, sin duda volveré a comprar aquí.",
      color: "#ff5722",
    },
    {
      avatar: "https://i.postimg.cc/d3yjZQ0v/hombre-2.webp",
      name: "Carlos Gómez",
      time: "Hace 1 mes",
      review: "Excelente servicio al cliente. Tuve un problema con mi pedido y lo resolvieron rápidamente. ¡Muy recomendable!",
      color: "#8bc34a",
    },
    {
      avatar: "https://i.postimg.cc/t45txM91/lucia.jpg",
      name: "Lucía Fernández",
      time: "Hace 3 días",
      review: "El envío fue rápido y el embalaje muy cuidado. Además, el precio es muy competitivo.",
      color: "#03a9f4",
    },
    {
      avatar: "https://i.postimg.cc/Y2G3sRzV/hombre-1.jpg",
      name: "Jorge Martínez",
      time: "Hace 1 semana",
      review: "Me encanta la variedad de productos que ofrecen. Todo lo que pedí llegó en perfectas condiciones.",
      color: "#fbc02d",
    },
    {
      avatar: "https://i.postimg.cc/qRgL0xVN/Ana.jpg",
      name: "Ana Rodríguez",
      time: "Hace 2 meses",
      review: "Compré varios artículos y estoy muy satisfecha. El sitio es fácil de usar y tiene descripciones claras.",
      color: "#d32f2f",
    },
    {
      avatar: "https://i.postimg.cc/0NVfLH3g/hombre-3.jpg",
      name: "Miguel Pérez",
      time: "Hace 4 días",
      review: "Nunca había tenido una experiencia de compra online tan buena. Definitivamente se han ganado un cliente frecuente.",
      color: "#4caf50",
    },
    {
      avatar: "https://i.postimg.cc/FRfjwF3c/sofia.jpg",
      name: "Sofía Herrera",
      time: "Hace 3 semanas",
      review: "Los descuentos son increíbles y siempre tienen promociones que valen la pena. ¡Recomiendo esta tienda al 100%!",
      color: "#9c27b0",
    },
    {
      avatar: "https://i.postimg.cc/Ss5GKYkD/hombre-4.jpg",
      name: "Luis Ramírez",
      time: "Hace 5 días",
      review: "Muy satisfecho con mi compra. Es genial ver que realmente cuidan los detalles, desde el empaque hasta el envío.",
      color: "#e91e63",
    },
    {
      avatar: "https://i.postimg.cc/rwcNzk2X/isabel.webp",
      name: "Isabel Cruz",
      time: "Hace 2 semanas",
      review: "Tuve algunas dudas sobre un producto y el soporte me ayudó rápidamente. ¡Qué buen equipo tienen!",
      color: "#3f51b5",
    },
    {
      avatar: "https://i.postimg.cc/L6jVHs73/hombre-5.jpg",
      name: "Daniel Vargas",
      time: "Hace 1 mes",
      review: "La calidad es impresionante, y los productos son exactamente como los describen. Ya he hecho varias compras.",
      color: "#ff9800",
    },
    {
      avatar: "https://i.postimg.cc/k5YQjR6q/Paula.jpg",
      name: "Paula Morales",
      time: "Hace 2 días",
      review: "La entrega fue súper rápida. Estoy encantada con mi nueva compra, justo como lo esperaba.",
      color: "#607d8b",
    },
    {
      avatar: "https://i.postimg.cc/3rsB5GLw/hombre-6.jpg",
      name: "Juan Torres",
      time: "Hace 3 semanas",
      review: "Realmente saben cómo tratar a sus clientes. Mi experiencia de compra fue sencilla y sin problemas.",
      color: "#795548",
    },
  ];
  
const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % reviewsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 3 + reviewsData.length) % reviewsData.length
    );
  };

  const visibleReviews = reviewsData.slice(currentIndex, currentIndex + 3);

  return (
    <div className="customer-reviews">
      <h1 className="customer-reviews-title">Lo que dicen nuestros clientes..</h1>
      <div className="customer-reviews-container">
        <div className="reviews-wrapper">
          {visibleReviews.map((review, index) => (
            <div
              key={index}
              className="customer-review-card"
              style={{ borderTop: `5px solid ${review.color}` }}
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="customer-avatar"
              />
              <div className="customer-review-content">
                <h4 className="customer-review-author">{review.name}</h4>
                <p className="customer-review-time">{review.time}</p>
                <p className="customer-review-text">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="controls">
        <button className="control-button" onClick={handlePrev}>&lt;</button>
        <button className="control-button" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
