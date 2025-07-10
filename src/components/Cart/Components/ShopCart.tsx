import React, { useEffect, useState } from "react";
import "../assets/styles/ShoppingCart.css";
import { useQuery, useMutation , useQueryClient} from "@tanstack/react-query";
import { getviewCart, updateCartQuantity ,eliminardelCarrito, vaciarcarrito} from "../../../models/cartModel";
import { debounce } from "lodash";
import { FaTrash, FaMinus, FaPlus, FaCreditCard  } from 'react-icons/fa';
import { Snackbar, Alert, AlertTitle} from '@mui/material';

// Tipos de datos
interface CartItem {
  idProducto: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

interface CartDetails {
  idCarrito: number;
  items: CartItem[];
}

const Cart: React.FC = () => {
  const idUsuario = localStorage.getItem("userId");
  console.log("este es mi usuario: " + idUsuario);
  const queryclient = useQueryClient();
  // variables para el manejo del carrito
  const [discountCode, setDiscountCode] = useState<string>(""); // Código de descuento ingresado
  const [discountValue, setDiscountValue] = useState<number>(0); // Valor del descuento
  const [discountApplied, setDiscountApplied] = useState<boolean>(false); // Estado del descuento aplicado
  //para los snacksbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarTitle, setSnackbarTitle] = useState('');
  // Hook para obtener carrito desde la API


  // Hook para actualizar cantidad
  const {mutate, isPending: isPendingMutation} = useMutation({
    mutationFn: updateCartQuantity,
    onSuccess: async () => {
      // Refresca los datos del carrito después de la eliminación
    await   queryclient.invalidateQueries({
      queryKey: ['cart']
    });
    setLoadingItemId(null); // Quitamos el loading al terminar
    }
      
  });
  const deleteMutation = useMutation( {
    mutationFn: eliminardelCarrito,
    onSuccess: async () => {
      // Refresca los datos del carrito después de la eliminación
    await   queryclient.invalidateQueries({
      queryKey: ['cart']
    });
    },
    onError: (error) => {
      console.error("Error al eliminar el producto del carrito:", error);
    },
  });
  
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  // Si no hay usuario, obtenemos el carrito desde localStorage
  useEffect(() => {
    if (!idUsuario) {
      const storedCart = localStorage.getItem("carrito");
      setLocalCart(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [idUsuario]);

  const {
    data: cart = {itemsCarrito: [], detallesCarrito: {}}, // para almacenar el carrito
    isLoading, // el estado para ver si carga
    isError,
  } = useQuery({
    queryKey: ["cart", idUsuario], // como se va identificar el usuario 
    queryFn: async () => {
      if (!idUsuario) {
        // Si no hay usuario, no hacemos la llamada a la API
        return { items: [], detallesCarrito: {} }; // Retornamos un carrito vacío
      }
      try {
        const data = await getviewCart(parseInt(idUsuario));
        console.log("Carrito desde la API:", data); // Verifica la respuesta de la API
        return data || {items: [], detallesCarrito: {} };
      } catch (error) {
        console.error("Error al obtener carrito:", error);
        return { items: [] }; // En caso de error, devolvemos un carrito vacío
      }
    },
    enabled: !!idUsuario, // Solo ejecutar si hay un idUsuario
  });

  // El subtotal, incluyendo los productos de la API o localStorage
  const items = idUsuario ? cart?.itemsCarrito || [] : localCart;
  const detailCart = idUsuario ? cart?.detallesCarrito : [];
  // calculamos el subtotal 
  const subtotal = items.reduce(
    (total: number, item: { precio: number; cantidad: number }) =>
      total + item.precio * item.cantidad,
    0
  );

  const taxRate = 0.1;
  const shippingCost = items.length === 0 ? 0 : subtotal > 100 ? 0 : 10;
  const tax = subtotal * taxRate;
  const totalAmount = subtotal + tax + shippingCost - discountValue;

  const handleQuantityChange = debounce( (idProducto: number, cantidad: number) => {
    if(isPendingMutation) return;
    setLoadingItemId(idProducto); // Establecer el producto que está cargando
// Actualizamos la cantidad en el carrito
setTimeout(() =>{ if (idUsuario && cart) {
      mutate({
        cantidad,
        idCarrito: detailCart.idCarrito,
        idProducto,
      });
    } else {
     // Lógica para usuarios no logueados (carrito local)
     const updatedCart = localCart.map((item) =>
      item.idProducto === idProducto
        ? { ...item, cantidad: item.cantidad + cantidad }
        : item
    );

    // Filtrar productos con cantidad <= 0 (removerlos del carrito)
    const filteredCart = updatedCart.filter((item) => item.cantidad > 0);

    setLocalCart(filteredCart);
    localStorage.setItem("carrito", JSON.stringify(filteredCart));
    setLoadingItemId(null); // Terminar el loading
    }},300)
  }, 500)

  const handleDecrement = (idProducto: number, cantidad: number) => {
    if (cantidad > 1) handleQuantityChange(idProducto,  - 1);
  };

  const handleIncrement = (idProducto: number) => {
    handleQuantityChange(idProducto,  + 1);
  };

  const handleDelete = ( idProducto: number) => {
    if(idUsuario){deleteMutation.mutate({
      idCarrito: detailCart.idCarrito,
      idProducto, 
    });} 
    else{
       // Lógica para carrito local
    const updatedCart = localCart.filter((item) => item.idProducto !== idProducto);
    setLocalCart(updatedCart);
    localStorage.setItem("carrito", JSON.stringify(updatedCart));
    }
  };
  const handleCheckout = () => {
    localStorage.setItem("idCart", detailCart.idCarrito);
    window.location.href = "/cartPayment";
  };
  const [carritoVacio, setCarritoVacio] = useState(false);
  const vaciarCart = useMutation({
    mutationFn: vaciarcarrito,
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: ['cart']
      });
      queryclient.setQueryData(["cart", idUsuario], {
        itemsCarrito: [],
        detallesCarrito: {},
      });// Limpia los datos localmente
      setCarritoVacio(true); // Forzar re-render
    },
    onError: (error) => {
      console.error("Error al vaciar el carrito:", error);
    }
  });

  const handleVaciarCarrito = () => {
    if(vaciarCart.isPending) return;
      if (idUsuario) {
        vaciarCart.mutate(
          { idCarrito: detailCart.idCarrito }
        );
      } else {
        // Lógica para carrito local
        setLocalCart([]); // Limpia el estado local
        localStorage.removeItem("carrito");
        setCarritoVacio(true); // Forzar re-render // Limpia el almacenamiento local
      }
   
  }; // Tiempo de debounce
  
  // Estado para rastrear cuál producto está cargando
  const [loadingItemId, setLoadingItemId] = useState<number | null>(null);
  
// Aplicar descuento con validación
const handleApplyDiscount = () => {
  if (discountCode === "DESCUENTO10") {
    const calculatedDiscount = subtotal * 0.1; // 10% del subtotal
    setDiscountValue(calculatedDiscount);
    setDiscountApplied(true);
    setSnackbarMessage('Descuento aplicado correctamente');
    setSnackbarSeverity('success');
    setSnackbarTitle('¡Éxito!');
  } else {
    setSnackbarMessage('Código de descuento no válido.');
    setSnackbarSeverity('error');
    setSnackbarTitle('Error');
  }
  setSnackbarOpen(true); // Mostrar el Snackbar
};
  
  //cerra el snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  console.log("Datos del carrito:", cart);
  console.log("Estado local del carrito:", localCart);

  return (
    <div className="cart-container">
      <main className="cart-main">
        <section className="cart-items-section">
          <h2>Carrito</h2>
          {isLoading && <p>Cargando productos...</p>}
          {isError && <p>hubo un error</p>}
          {!isLoading && !isError && !carritoVacio && items && items.length > 0 ? (
            items.map((item: CartItem) => (
              <div key={item.idProducto} className="cart-item">
                <img
                  src={item.imagen}
                  alt={item.nombreProducto}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.nombreProducto}</p>
                  <p className="cart-item-variant">{item.descripcion}</p>
                </div>
                <div className="cart-item-controls">
                  <span className="cart-item-price">${item.precio}</span>
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-button"
                      disabled =
                      {item.cantidad <= 1 && isPendingMutation}
                      onClick={() =>
                        handleDecrement(item.idProducto, item.cantidad)
                      }
                    >
                      <FaMinus/>
                    </button>
                    <span className="quantity-display">
                      {loadingItemId === item.idProducto ? (
                        <div className="loading-circle"></div>
                      ) : (
                        item.cantidad
                      )}
                    </span>
                    <button
                      className="quantity-button"
                      disabled = 
                      {item.cantidad >= 10 && isPendingMutation}
                
                      onClick={() =>
                        handleIncrement(item.idProducto,)
                      }
                    >
                      <FaPlus/>
                    </button>
                    <button className="remove-item"
                    onClick={() =>handleDelete(item.idProducto)}
                    ><FaTrash /></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items">
            <span className="no-products-icon">📦</span>
            Aun no hay productos en el carrito 🛒😔
            </p>
          )}
          {items.length > 0 &&(
          <div className="button-container">
            <button className="empty-cart-button" onClick={handleVaciarCarrito}><FaTrash/>Vaciar carrito</button>
          </div>
              )}
        </section>
        {items.length > 0 &&(
        <aside className="cart-summary">
          <h3>Total</h3>
          <div className="discount-section">
            <input
              type="text"
              placeholder="Código de descuento"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="discount-input"
            />
            <button className="apply-discount-button" onClick={handleApplyDiscount} disabled={discountApplied}>
              Aplicar descuento
            </button>
          </div>
          {discountApplied && (
            <p className="discount-applied">
              Descuento aplicado: -${discountValue.toFixed(2)}
            </p>
          )}
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>IVA</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="summary-actions">
            <button className="checkout-button" onClick={handleCheckout}>
             <FaCreditCard /> Procesar pago
            </button>
          </div>
        </aside>
        )}
      </main>
      {/* Snackbar de Material UI */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000} // Se cierra automáticamente después de 4 segundos
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Posición superior derecha
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          <AlertTitle>{snackbarTitle}</AlertTitle>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;