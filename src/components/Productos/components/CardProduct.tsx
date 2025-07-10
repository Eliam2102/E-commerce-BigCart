import React, { useState } from 'react';
import { Product } from '../interfaces/Product';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material'; // Importa Snackbar y Alert
import '../assets/styles/CardProduct.css';
import { handleAddToCartwithLogin } from '../../../controllers/cartController';
import { agregarProductoLocal } from './addToCartOut';
import { MdAddShoppingCart } from 'react-icons/md';

interface ProductProps {
  product: Product;
}

const CardProduct: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const idUsuario = localStorage.getItem('userId') ?? '';
  
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddToCart = () => {
    const item = {
      idProducto: product.idProducto,
      cantidad: 1,
      nombreProducto: product.nombreProducto,
      descripcion: product.descripcion,
      precio: product.precio,
      imagen: product.imagenUrl,
      idCategoria: product.idCategoria,
    };

    if (!idUsuario) {
      agregarProductoLocal(item);
      setSnackbar({
        open: true,
        message: `Producto Agregado Correctamente: "${product.nombreProducto}"`,
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: `Producto Agregado Correctamente: "${product.nombreProducto}"`,
        severity: 'success',
      });
    }
    handleAddToCartwithLogin(parseInt(idUsuario), product.idProducto, 1);
  };

  const rating = typeof product.rating === 'string' ? parseFloat(product.rating) : product.rating;
  const price = typeof product.precio === 'string' ? parseFloat(product.precio) : product.precio;

  const renderStars = (rating: number) => {
    const maxStars = 5;
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      if (rating >= i) {
        stars.push(<span key={i} className="star full">★</span>);
      } else if (rating >= i - 0.5) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }
    return stars;
  };

  const handleCardClick = () => {
    navigate(`/detailProd/${product.idProducto}`); // Navega al detalle del producto
  };

  // Mapeo de categorías
  const categoryMap: { [key: number]: string } = {
    1: 'Electrónica',
    2: 'Hogar',
    3: 'Deportes',
    4: 'Moda',
    5: 'Alimentos',
    6: 'Juguetes',
    7: 'Salud y Belleza',
    8: 'Automotriz',
    9: 'Libros',
    10: 'Mascotas',
  };

  // Obtener el nombre de la categoría
  const categoryName = categoryMap[product.idCategoria] || 'Categoría desconocida';

  return (
    <>
      <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <img src={product.imagenUrl} alt={product.nombreProducto} className="product-image" />
        <h3 className="product-name">{product.nombreProducto}</h3>
        <p className="description">
          {product.descripcion ? product.descripcion.slice(0, 80) + '...' : 'Sin descripción'}
        </p>
        <p className="category">{categoryName}</p> {/* Mostramos el nombre de la categoría */}
        <div className="price-container">
          <span className="current-price">${price.toFixed(2)}</span>
        </div>
        <p className="sales">{100} vendidos</p>
        <div className="rating">
          {renderStars(rating)}
          <span className="rating-number">{rating.toFixed(1)}</span>
        </div>
        <button
          className="btn-icon add-to-cart"
          onClick={(e) => {
            e.stopPropagation(); // Evita la navegación cuando se hace clic en el botón
            handleAddToCart();
          }}
        >
          <MdAddShoppingCart size={32} />
        </button>
      </div>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Superior derecho
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity as 'success' | 'error'}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CardProduct;