import React from 'react';
import { Link } from 'react-router-dom';  
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import '../assets/styles/SoicalBar.css';

const SocialBar: React.FC = () => {
  return (
    <div className="social-bar">
      <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <div className="social-bar__item social-bar__fb">
          <FaFacebook size={20} />
        </div>
      </Link>

      <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <div className="social-bar__item social-bar__twitter">
          <FaTwitter size={20} />
        </div>
      </Link>

      <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <div className="social-bar__item social-bar__linkedin">
          <FaLinkedin size={20} />
        </div>
      </Link>

      <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <div className="social-bar__item social-bar__instagram">
          <FaInstagram size={20} />
        </div>
      </Link>

      <Link to="https://wa.me/529993898615" target="_blank" rel="noopener noreferrer">
        <div className="social-bar__item social-bar__whatsapp">
          <FaWhatsapp size={20} />
        </div>
      </Link>
    </div>
  );
};

export default SocialBar;
