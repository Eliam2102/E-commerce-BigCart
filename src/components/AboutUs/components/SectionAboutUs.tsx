import '../assets/styles/SectionAboutUs.css';
import imgHisto from '../assets/img/history.webp';
import imgAten from '../assets/img/antecion-cliente.jpeg';
import imgEntre from '../assets/img/entrega-cliente.jpg';
import imgTratos from '../assets/img/tratos-grandes.webp';
import imgComp from '../assets/img/comprando.webp';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        <h1 className="title">Sobre Nosotros</h1>

        <div className="section mission">
          <h2>Misión</h2>
          <p>
          Brindar una experiencia de compra online excepcional, ofreciendo una amplia variedad de productos a precios competitivos, garantizando eficiencia, comodidad, seguridad y la máxima satisfacción de nuestros clientes. 
          </p>
        </div>

        <div className="section vision">
          <h2>Visión</h2>
          <p>
          Convertirnos en una empresa líder en ventas al por mayor, reconocida por nuestra innovación, integridad y compromiso con la excelencia en cada aspecto de nuestro servicio.
          </p>
        </div>

        <div className="section team">
          <h2>Equipo</h2>
          <p>
            Contamos con un equipo dinámico y diverso, formado por profesionales apasionados por lo que hacen. Cada miembro aporta una perspectiva única, trabajando juntos para ofrecer la mejor experiencia a nuestros clientes.
          </p>
        </div>

        {/* Nueva sección con imagen a la derecha */}
        <div className="section story">
          <div className="text-content">
            <h2>Nuestra Historia</h2>
            <p>
              Desde nuestros inicios, hemos crecido con el compromiso de ofrecer los mejores productos. A lo largo de los años, hemos aprendido, evolucionado y mantenido nuestros valores fundamentales, siempre con el cliente en mente. Hoy, somos una marca reconocida en el sector gracias a la confianza de nuestros clientes y nuestro equipo dedicado.
            </p>
          </div>
          <div className="image-content">
            <img src={imgHisto} alt="Nuestra Historia" />
          </div>
        </div>

        {/* Sección final sobre nosotros */}
        <div className="section about-us-final">
          <h2>¿Por Qué Elegirnos?</h2>
          <p>
            En BigCart, nos diferenciamos por nuestra atención personalizada, calidad superior, y un servicio de atención al cliente excepcional. Creemos en construir relaciones a largo plazo con nuestros clientes, basadas en la confianza y la transparencia.
          </p>
        </div>
        {/* Sección de testimonios */}
        <div className="section testimonials">
          <h2>Testimonios de Nuestros Clientes</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <p>"Gran variedad de productos y un proceso de compra muy ágil. Me encanta que cumplan con los tiempos de entrega, lo que facilita mucho nuestra planificación de logística."</p>
              <span>- Juan Pérez -</span>
            </div>
            <div className="testimonial">
              <p>"Excelente servicio y atención personalizada. Siempre están dispuestos a ayudarnos a encontrar justo lo que necesitamos, ¡y los productos son totalmete de calidad y al menos precio!"</p>
              <span>- María López -</span>
            </div>
            <div className="testimonial">
              <p>"Precios competitivos y una logística impecable. Desde que comenzamos a trabajar con ellos, nuestro negocio ha ganado en eficiencia y hemos reducido tiempos de espera, 100% calidad."</p>
              <span>- Carlos Gómez -</span>
            </div>
          </div>
        </div>
        {/* Sección de línea de tiempo */}
        <div className="section timeline">
          <h2>Nuestra Historia a lo Largo del Tiempo</h2>
          <ul className="timeline-list">
            <li>
              <div className="timeline-date">2010</div>
              <div className="timeline-content">Fundación de BigCart con la misión de ofrecer productos de calidad.</div>
            </li>
            <li>
              <div className="timeline-date">2015</div>
              <div className="timeline-content">Expansión a nuevos mercados y lanzamiento de nuevas líneas de productos.</div>
            </li>
            <li>
              <div className="timeline-date">2020</div>
              <div className="timeline-content">Implementación de nuevas tecnologías para mejorar la experiencia del cliente.</div>
            </li>
            <li>
              <div className="timeline-date">2024</div>
              <div className="timeline-content">Reconocimiento como líder en el sector de ventas al por mayor.</div>
            </li>
          </ul>
        </div>
        {/* Sección de galería */}
        <div className="section gallery">
          <h2>Nuestros Momentos Destacados</h2>
          <div className="gallery-container">
            <img src={imgAten} alt="Atención" />
            <img src={imgEntre} alt="Capacitaciones" />
            <img src={imgComp} alt="Entregas" />
            <img src={imgTratos} alt="Tratos cerrados" />
          </div>
        </div>
        {/* Sección de valores corporativos */}
        <div className="section values">
          <h2>Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-item">
              <i className="icon fa fa-heart"></i>
              <h3>Calidad y Eficiencia</h3>
              <p>Nos dedicamos a servir con integridad y pasión, en cada uno de nuestros pedidos.</p>
            </div>
            <div className="value-item">
              <i className="icon fa fa-star"></i>
              <h3>Orientación al Cliente</h3>
              <p>Siempre buscamos la excelencia en todo lo que hacemos, para ofrecer siempre lo mejor.</p>
            </div>
            <div className="value-item">
              <i className="icon fa fa-lightbulb"></i>
              <h3>Innovación y Adaptabilidad</h3>
              <p>Creamos nuevas oportunidades para el crecimiento, tanto porfesional como social.</p>
            </div>
            <div className="value-item">
              <i className="icon fa fa-lightbulb"></i>
              <h3>Trabajo en Equipo</h3>
              <p>Creamos un ambiente colaborativo para nuestros colaboradores y sus responsabilidades.</p>
            </div>
            <div className="value-item">
              <i className="icon fa fa-heart"></i>
              <h3>Innovación</h3>
              <p>Fomentamos la creatividad y la mejora continua en todos nuestros procesos y cada uno denuestro productos.</p>
            </div>
            <div className="value-item">
              <i className="icon fa fa-users"></i>
              <h3>Liderazgo</h3>
              <p>Promovemos el liderazgo en todos los niveles, brindando oportunidades para el crecimiento.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
