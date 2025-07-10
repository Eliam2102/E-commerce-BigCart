//importar el componente a pasar para esa ruta
import AboutUs from '../AboutUs/components/SectionAboutUs.tsx';
import Login from '../Auth/components/Login.tsx';
import Cart from '../Cart/Components/ShopCart.tsx';
import Home from '../Home/components/SectionHome.tsx';
import CatalogsProducts from "../Productos/components/SectionProducts.tsx";
import ContactUs from '../ContactUs/components/SectionContactUs.tsx';
import UserProfile from '../Auth/components/UserProfile.tsx';
import SignUp from '../Auth/components/SignUp.tsx';
import CartPayment from '../PaymentMethod/components/CartPayment.tsx';
import ProtectedRoute from '../Middlewares/authTokenMiddlewar.tsx';
import ProductDetails from '../Productos/components/DetailProduct.tsx';
import Shopping from '../Compras/components/shopping_section.tsx';



// en este caso en vez de renderiza algun mensaje renderizaremos el
// componente importado
// En este array se manejaran todas las rutas y se agregaran las nuevas en caso de que se implementen
const routes = [
    { path: "/", element: <Home /> },
    { path: "/about-us", element: <AboutUs /> },
    { path: "/login", element: <Login /> },
    { path: "/cart", element: <Cart /> },
    {
      path: "/cartPayment", 
      element: (
        <ProtectedRoute>
          <CartPayment /> {/* Aquí es donde se renderiza el componente protegido */}
        </ProtectedRoute>
      ),
    },
    {
      path: "/cartPayment", 
      element: (
        <ProtectedRoute>
          <CartPayment /> {/* Aquí es donde se renderiza el componente protegido */}
        </ProtectedRoute>
      ),
    },
    { path: "/productos", element: <CatalogsProducts /> },
    { path: "/contactus", element: <ContactUs/> },
    { path: "/SignUp", element: <SignUp/> },
    {path: "/account", element: <UserProfile/>},
    { path: "/detailProd/:idProducto", element: <ProductDetails /> },
    {
      path: "/shopping",
      element: (
        <ProtectedRoute>
          <Shopping/>
        </ProtectedRoute>
      ),
    }
  ];

export default routes;