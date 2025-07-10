// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar/components/NavBar';
import routes from './components/Routes/AppRoutes';
import Footer from './components/Control/components/Footer';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Llevar el scroll a la parte superior
  }, [location]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Añadido para manejar el scroll */}
      <Navbar />

      {/* El contenido principal (las rutas) se renderizan fuera del Navbar */}
      <main>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
