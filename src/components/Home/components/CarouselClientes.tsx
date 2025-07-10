import React from "react";
import "../assets/styles/CarouselClientes.css";
import image1 from "../assets/img/tecnomundo.png";
import image2 from "../assets/img/Walmart-Logo.png";
import image3 from "../assets/img/extra-logo.png";
import image4 from "../assets/img/Logo-Duero-Mayoreo_big.png";
import image6 from "../assets/img/Aliexpress_logo.svg.png";
import image7 from "../assets/img/frikiplaza-png.png";

const images = [image1, image2, image3, image4, image6, image7];

const BenefitsSection = () => {
  return (
    <section className="benefits-section">
      <div className="benefits-content">
        {/* Texto informativo */}
        <div className="benefits-text">
          <h2 className="benefits-title">¿Por qué elegirnos?</h2>
          <p className="benefits-description">
            Contamos con alianzas estratégicas con las principales marcas y
            negocios del mercado. Nuestro compromiso es brindarte productos de
            calidad y un servicio excepcional para que cada compra sea una gran
            experiencia.
          </p>
          <ul className="benefits-list">
            <li>Trabajamos con marcas reconocidas internacionalmente.</li>
            <li>Garantizamos confianza en todas tus compras.</li>
            <li>Ofrecemos soporte dedicado para cualquier consulta.</li>
          </ul>
        </div>

        {/* Visual interactivo: Logotipos de socios */}
        <div className="benefits-logos">
          {images.map((img, index) => (
            <div className="logo-container" key={index}>
              <img src={img} alt={`Logo ${index + 1}`} className="brand-logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
