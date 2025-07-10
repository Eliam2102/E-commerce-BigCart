import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { resetPayment, updateField } from '../../../redux/paymentSlice';
import { z } from 'zod';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/CartPayment.css';

// Importa la lógica de detección de tarjetas
import { validateCardType, cardIcons, CardType } from './validationCard';
import { CompraCarrito } from '../../../models/cartModel';
import { parseInt } from 'lodash';

const CartPayment: React.FC = () => {
  const dispatch = useDispatch();
  const payment = useSelector((state: RootState) => state.payment);

  // Estados locales
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);


  // Esquema de validación Zod
  const paymentSchema = z.object({
    cardNumber: z
      .string()
      .refine((value) => {
        const cardType = validateCardType(value.replace(/\s/g, ""));
        const length = value.replace(/\s/g, "").length;
        return (
          (cardType === "AmericanExpress" && length === 15) ||
          (cardType !== "AmericanExpress" && length === 16)
        );
      }, {
        message: "Número de tarjeta inválido. Verifica la longitud según el tipo de tarjeta.",
      }),
    expirationDate: z
      .string()
      .regex(/^\d{2}\/\d{2}$/, "Fecha de expiración no es válida")
      .refine((value) => {
        const [month, year] = value.split("/").map(Number);
        const currentYear = new Date().getFullYear() % 100; // Año en formato YY
        return month >= 1 && month <= 12 && year >= currentYear;
      }, {
        message: "Fecha de expiración inválida. Revisa el mes y el año.",
      }),
    cvv: z
      .string()
      .refine((value) => {
        // El numero de tarjeta ya ha sido validado antes de usar este esquema
        const cardType = validateCardType(payment.cardNumber.replace(/\s/g, ""));
        return (
          (cardType === "AmericanExpress" && value.length === 4) ||
          (cardType !== "AmericanExpress" && value.length === 3)
        );
      }, {
        message: "CVV no válido para el tipo de tarjeta.",
      }),
    cardholderName: z.string().min(1, "El nombre del titular es obligatorio"),
  });

  const navigate = useNavigate();

  // Validación de campos
  const validateFields = () => {
    const result = paymentSchema.safeParse(payment);
    if (!result.success) {
      const fieldErrors = result.error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      setIsPaymentSuccess(true);
      // Limpiar el estado después de confirmar el pago
      dispatch(resetPayment());
      const idCart = localStorage.getItem("idCart");
      try {
        if (idCart) {
          await CompraCarrito({ idCarrito: parseInt(idCart) });
        }


      } catch (error) {
        console.error("Error al procesar el carrito:", error);
        setErrors({ general: "Error al procesar el pago. Inténtalo de nuevo." });
      } finally {
        localStorage.removeItem("idCart");
        // Redirige a la página principal después de unos segundos
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    }
  };

  // Detectar el tipo de tarjeta
  const cardType: CardType = validateCardType(payment.cardNumber);
  const cardIcon = cardIcons[cardType];

  // Manejo del cambio en el número de tarjeta
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const cardType = validateCardType(rawValue);

    // Ajustar la longitud máxima según el tipo de tarjeta
    const maxLength = cardType === 'AmericanExpress' ? 15 : 16;
    const limitedValue = rawValue.slice(0, maxLength);

    // Formatear según el tipo de tarjeta
    const formattedValue =
      cardType === 'AmericanExpress'
        ? limitedValue.match(/.{1,4}|.{1,6}|.{1,5}/g)?.join(' ')
        : limitedValue.match(/.{1,4}/g)?.join(' ');

    dispatch(updateField({ field: 'cardNumber', value: formattedValue || '' }));
  };

  if (isPaymentSuccess) {
    return (
      <div className="payment-success">
        <Confetti />
        <div className="success-modal">
          <h1>¡Pago exitoso!</h1>
          <p>Serás redirigido a la página principal en breve.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-payment">
      <div className="encabezadoPayment">
        <h1>Tarjeta de crédito o débito</h1>
        <div className="iconsCard">
          <img src={cardIcons.Visa} alt="Visa" />
          <img src={cardIcons.MasterCard} alt="MasterCard" />
          <img src={cardIcons.AmericanExpress} alt="AmericanExpress" />
          <img src={cardIcons.Discover} alt="Discover" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="cardNumber">
          <label htmlFor="cardNumber">Número de Tarjeta</label>
          <input
            type="text"
            id="cardNumber"
            value={payment.cardNumber}
            placeholder="XXXX XXXX XXXX XXXX"
            style={{
              backgroundImage: `url(${cardIcon})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
              backgroundSize: '45px',
              paddingRight: '45px',
              width: '100%',
              boxSizing: 'border-box',
            }}
            onChange={handleCardNumberChange}
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
        </div>
        <div className="cardData">
          <div>
            <label htmlFor="expirationDate">Fecha de Expiración</label>
            <input
              type="text"
              id="expirationDate"
              value={payment.expirationDate}
              placeholder="MM/YY"
              maxLength={5}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                }
                if (value.length > 5) {
                  value = value.slice(0, 5);
                }
                dispatch(updateField({ field: 'expirationDate', value }));
              }}
            />
            {errors.expirationDate && <p className="error">{errors.expirationDate}</p>}
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              value={payment.cvv}
              maxLength={cardType === 'AmericanExpress' ? 4 : 3} // Ajusta dinámicamente la longitud
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ''); // Remueve caracteres no numéricos
                const maxLength = cardType === 'AmericanExpress' ? 4 : 3;
                const validValue = rawValue.slice(0, maxLength); // Asegura que no exceda la longitud máxima
                dispatch(updateField({ field: 'cvv', value: validValue }));
              }}
            />
            {errors.cvv && <p className="error">{errors.cvv}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="cardholderName">Nombre del Titular</label>
          <input
            type="text"
            id="cardholderName"
            placeholder="BigCart"
            value={payment.cardholderName}
            onChange={(e) =>
              dispatch(updateField({ field: 'cardholderName', value: e.target.value }))
            }
          />
          {errors.cardholderName && <p className="error">{errors.cardholderName}</p>}
        </div>
        <div className="buttonAction">
          <button type="submit">Pagar</button>
        </div>
      </form>
    </div>
  );
};

export default CartPayment;
