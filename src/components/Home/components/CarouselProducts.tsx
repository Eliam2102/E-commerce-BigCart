import React from "react";
import "../assets/styles/CarouselProducts.css";

const productImages = [
  "https://i.postimg.cc/J46THxkV/altavoz-inteligente.png",
  "https://i.postimg.cc/tJDB5tv6/camara-digital.png",
  "https://i.postimg.cc/hj1sD1BY/router.png",
  "https://i.postimg.cc/htX2LmLJ/mouse-gamer.png",
  "https://i.postimg.cc/D0fg84fw/teclado.webp",
  "https://i.postimg.cc/Y9Qn1Fh4/arena-ecologica-gatos.png",
  "https://i.postimg.cc/zDjp88W1/croquetas.png",
  "https://i.postimg.cc/7hGLsxrT/cortaun-as.png",
];

const IntroProducts: React.FC = () => {
  return (
    <div className="intro-products">
      <h1 className="section-title">Conoce Nuestros Productos</h1>
      <div className="intro-content">
      <div className="slider-container">
          <div className="slider-track">
            {[...productImages, ...productImages].map((image, index) => (
              /* Duplicamos las imágenes para simular la continuidad */
              <img
                key={index}
                src={image}
                alt={`Producto ${index + 1}`}
                className="slider-image-prod"
              />
            ))}
          </div>
        </div>
        <div className="text-content">
          <h2 className="intro-title">Calidad y Variedad</h2>
          <p className="intro-description">
          Descubre productos diseñados para superar tus expectativas. Calidad premium, diseño innovador y funcionalidad práctica se unen para ofrecerte soluciones que realmente hacen la diferencia. Eleva tu experiencia y encuentra justo lo que necesitas con nosotros.
          </p>
          <button
            className="explore-button"
            onClick={() => (window.location.href = "/productos")}
          >
            Ver Productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroProducts;