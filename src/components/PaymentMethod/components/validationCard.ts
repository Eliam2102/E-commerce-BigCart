import '../assets/Styles/CartPayment.css';


/* Iconos de tarjetas */
import Visa from '../assets/image/cardVisa.svg'; 
import MasterCard from '../assets/image/logotipo-mastercard.svg';
import AmericanExpress from '../assets/image/cardAmex.svg';
import Discover from '../assets/image/cardDiscover.svg';
import Desconocida from '../assets/image/desconocida.svg';

// Define los íconos de las tarjetas
export const cardIcons = {
  Visa,
  MasterCard,
  AmericanExpress,
  Discover,
  Desconocida,
};

// Define el tipo para los tipos de tarjetas
export type CardType = keyof typeof cardIcons;

// Función para detectar el tipo de tarjeta
export const validateCardType = (cardNumber: string): CardType => {
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
  
    if (/^4\d{12}(\d{3})?$/.test(cleanCardNumber)) {
      return 'Visa';
    }
  
    if (/^(5[1-5]\d{14}|2[2-7][0-9]{13})$/.test(cleanCardNumber)) {
      return 'MasterCard';
    }
  
    if (/^3[47]\d{13}$/.test(cleanCardNumber)) {
      return 'AmericanExpress';
    }
  
    if (/^6011\d{12}$/.test(cleanCardNumber)) {
      return 'Discover';
    }

  
    return 'Desconocida';
  };
  
