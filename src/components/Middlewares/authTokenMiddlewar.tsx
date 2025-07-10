import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('authToken');
  const location = useLocation(); // Obtenemos la ubicación actual

  if (!token) {
    // Si no hay token, redirigimos al login y guardamos la ubicación actual
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Si hay token, validamos su expiración
  const decodedToken: { exp: number } = jwtDecode(token);
  const isExpired = decodedToken.exp * 1000 < Date.now();

  if (isExpired) {
    // Si el token está expirado, eliminamos el token y redirigimos al login
    localStorage.removeItem('authToken');
    return <Navigate to="/login" />;
  }

  // Si el token es válido, renderizamos el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute;
