import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImagePath from '../assets/img/BIgCart.svg';
import iconCart from '../assets/img/icon-cart.svg';
import "../assets/styles/NavBar.css";
import { jwtDecode } from 'jwt-decode';
import { logout } from "../../../redux/userSlices";
import { useDispatch } from "react-redux";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string): string => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleDropdown = (): void => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (): void => {
    setDropdownOpen(false);
  };

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileImage');  // Eliminar imagen de perfil al cerrar sesión
    navigate('/'); // Redirige al home después de cerrar sesión
    dispatch(logout()); // Actualiza el estado global
  };

  // Verifica si el usuario está autenticado
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: { exp: number } = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        return !isExpired;
      } catch (error) {
        return false; 
      }
    }
    return false;
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-middle">
        <Link to="/" className="navbar-brand">
          <img
            src={logoImagePath}
            width="220"
            height="156"
            className="navbar-logo"
            alt="Brand Logo"
          />
        </Link>

        {/* Dropdown y carrito */}
        <div className="navbar-right">
          <div className="navbar-dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <div className={`hamburger-icon ${isDropdownOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            <ul className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
              <li className="nav-item">
                <Link to="/about-us" className={`nav-link ${isActive("/about-us")}`} onClick={closeDropdown}>Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link to="/productos" className={`nav-link ${isActive("/productos")}`} onClick={closeDropdown}>Productos</Link>
              </li>
              <li className="nav-item">
                <Link to="/contactus" className={`nav-link ${isActive("/contactus")}`} onClick={closeDropdown}>Contáctenos</Link>
              </li>
              {/* Aquí cambia la opción según si está autenticado muestra el link correspondiente*/}
              {isAuthenticated() ? (
                <>
                  <li className="nav-item">
                    <Link to="/account" className={`nav-link ${isActive("/account")}`} onClick={closeDropdown}>Mi cuenta</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/shopping" className={`nav-link ${isActive("/shopping")}`} onClick={closeDropdown}>Mis compras</Link>
                  </li>
                  <li className="nav-item">
                  <Link to="" className={`nav-link`} onClick={handleLogout}>Cerrar sesión</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className={`nav-link ${isActive("/login")}`} onClick={closeDropdown}>Iniciar sesión</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Carrito */}
          <div className={`btn-cart ${isActive("/Cart") ? 'active' : ''}`}>
            <Link to="/Cart">
              <img src={iconCart} width="25" height="25" alt="Cart Icon" />
            </Link>
          </div>
        </div>
      </div>

      {/* Botón "hamburger" para el menú móvil */}
      <div className="menu-toggle" onClick={toggleMobileMenu}>
        <div className="menu-icon"></div>
      </div>

      {/* Menú móvil desplegable */}
      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="close-icon" onClick={toggleMobileMenu}></div>
        <ul className="navbar-nav">
          <li className={`nav-item ${isActive("/")}`}>
            <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Inicio</Link>
          </li>
          <li className={`nav-item ${isActive("/about-us")}`}>
            <Link to="/about-us" className="nav-link" onClick={toggleMobileMenu}>Nosotros</Link>
          </li>
          <li className={`nav-item ${isActive("/products")}`}>
            <Link to="/productos" className="nav-link" onClick={toggleMobileMenu}>Productos</Link>
          </li>
          <li className={`nav-item ${isActive("/Cart")}`}>
            <Link to="/Cart" className="nav-link" onClick={toggleMobileMenu}>Carrito</Link>
          </li>
          <li className={`nav-item ${isActive("/contactus")}`}>
            <Link to="/contactus" className="nav-link" onClick={toggleMobileMenu}>Contáctenos</Link>
          </li>
          {/* Menú para iniciar o cerrar sesión */}
          {isAuthenticated() ? (
            <>
              <li className="nav-item">
                <Link to="/account" className="nav-link" onClick={toggleMobileMenu}>Mi cuenta</Link>
              </li>
              <li className="nav-item">
                <Link to="/shopping" className="nav-link" onClick={toggleMobileMenu}>Mis compras</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => { handleLogout(); toggleMobileMenu(); }}>Cerrar sesión</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={toggleMobileMenu}>Iniciar sesión</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
