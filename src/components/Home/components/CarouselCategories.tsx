import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaHome, FaDumbbell, FaTshirt, FaAppleAlt, FaGamepad, FaHeartbeat, FaCar, FaBook, FaDog } from "react-icons/fa";
import "../assets/styles/CarouselCategories.css";

const CategoriesSection = () => {
  const categories = [
    { id: 1, name: "Electrónica", icon: <FaLaptop style={{ color: "#1E90FF" }} /> }, // Azul intenso
    { id: 2, name: "Hogar", icon: <FaHome style={{ color: "#FF6F61" }} /> },        // Rojo coral
    { id: 3, name: "Deportes", icon: <FaDumbbell style={{ color: "#FF6347" }} /> }, // Naranja intenso
    { id: 4, name: "Moda", icon: <FaTshirt style={{ color: "#32CD32" }} /> },       // Verde lima
    { id: 5, name: "Alimentos", icon: <FaAppleAlt style={{ color: "#FF4500" }} /> }, // Rojo brillante
    { id: 6, name: "Juguetes", icon: <FaGamepad style={{ color: "#8A2BE2" }} /> },  // Morado vibrante
    { id: 7, name: "Salud y Belleza", icon: <FaHeartbeat style={{ color: "#FF1493" }} /> }, // Rosa intenso
    { id: 8, name: "Automotriz", icon: <FaCar style={{ color: "#228B22" }} /> },    // Verde bosque
    { id: 9, name: "Libros", icon: <FaBook style={{ color: "#FFD700" }} /> },       // Dorado brillante
    { id: 10, name: "Mascotas", icon: <FaDog style={{ color: "#00BFFF" }} /> },     // Azul celeste intenso
  ];

  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowIndicator(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="categories-section">
      <div className="categories-container">
        {/* Texto descriptivo */}
        <div className="categories-text">
          <h1 className="categories-title">
            ¡Explora nuestras categorías y encuentra lo que buscas!
          </h1>
          <p className="categories-subtitle">
            Desde productos únicos hasta lo último en tendencias, tenemos algo para cada ocasión.
          </p>
        </div>

        {/* Carrusel de tarjetas */}
        <div className="categories-carousel">
          {showIndicator && <div className="scroll-indicator">Desliza para explorar →</div>}
          <div className="carousel-wrapper">
            {categories.map((category) => (
              <div className="carousel-card" key={category.id}>
                <div className="card-icon">{category.icon}</div>
                <h3 className="card-title">{category.name}</h3>
                <p className="card-description">
                  Explora lo mejor de la categoría {category.name}.
                </p>
                <ul className="card-links">
                  <li>
                    <a href={`/productos?name=${category.name}`}>
                      Ver más
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;