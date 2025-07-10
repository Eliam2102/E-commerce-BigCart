import '../assets/styles/Home.css';
import BenefitsSection from './CarouselClientes';
import CarouselPromotions from '../components/CarouselPromotions';
import IntroProducts from "../components/CarouselProducts";
import CategoriesSection from "../components/CarouselCategories";
import CustomerReviews from "../components/CarouseReviews";
import CallToAction from './CtaComponent.tsx'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home">
        {/* Ofertas Especiales */}
        <section className="special-offers">
          <div className="offer-list">
            <CarouselPromotions />
          </div>
        </section>
      {/* Bienvenida */}
      <section className="minimalist-welcome">
        <div className="content-wrapper">
          <h1 className="headline">Donde la variedad y los precios al por mayor se encuentran.</h1>
          <p className="subheadline-welcome">¡Explora nuestras secciones ahora mismo y conoce todo lo que tenemos para ti! Descubre más sobre nuestra historia, lo que nos impulsa, y los productos únicos que hemos creado pensando en ti. ¡Estás a solo un clic de encontrar lo que necesitas!</p>
          <a href="/productos" className="cta-button">Explorar ahora</a>
        </div>
      </section>

      {/* CTA #1*/}
      <section>
        <CallToAction/>
      </section>

      {/* Clientes */}
      <section className="categories-cli">
      <h2 className="section-title-cli">Nuestros clientes</h2>
        <BenefitsSection/>
      </section>

       {/* reviews*/}
       <section className="customer-reviews">
        <CustomerReviews/>
        </section>

       {/* Categorías */}
      <section className="categories">
         <CategoriesSection />
      </section>


      {/* Productos Destacados */}
      <section className="featured-products">
        <div className="product-list">
          <IntroProducts />
        </div>
      </section>


      {/* Llamada a la acción */}
      <section className="call-to-action">
        <h2>Únete a Nuestra Comunidad</h2>
        <p>Regístrate para recibir ofertas exclusivas y descuentos especiales.</p>
        <Link to="contactus" className="sign-up-btn">
          Registrarse ahora
        </Link>
      </section>
    </div>
  );
};

export default Home;