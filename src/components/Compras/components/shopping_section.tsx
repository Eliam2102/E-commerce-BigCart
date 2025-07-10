import "../assets/shopping.css";
import CardProductoShop from "./producto_shopping";
import { useQuery } from "@tanstack/react-query";
import { getviewShop } from "../../../models/cartModel";

interface DetalleCompra {
  idCompra: number; // Identificador único de la compra
  Fecha_Compra: string; // Fecha de la compra
}

interface ItemShop {
  idProducto: number; // Identificador único del producto
  cantidad: number; // Cantidad comprada del producto
  imagenUrl: string; // URL de la imagen del producto
  descripcionProducto: string; // Descripción del producto
}

interface Compra {
  detalleCompra: DetalleCompra;
  itemShop: ItemShop[];
}

const Shopping = () => {
  const idUsuario = localStorage.getItem("userId");

  const { data: compras, isLoading, isError } = useQuery<Compra[]>({
    queryKey: ["shop", idUsuario],
    queryFn: async () => {
      if (!idUsuario) {
        return []; // Si no hay usuario, devolvemos un array vacío
      }
      try {
        const data = await getviewShop(parseInt(idUsuario));
        console.log("Compras desde la API:", data);
        return data;
      } catch (error) {
        console.error("Error al obtener compras:", error);
        return [];
      }
    },
    enabled: !!idUsuario, // Ejecutar solo si existe un `idUsuario`
  });

  if (isLoading) return <p>Cargando compras...</p>;
  if (isError) return <p>Error al cargar las compras</p>;
  if (!compras || compras.length === 0)
    return (
      <p className="no-shopings">
        <span className="no-products-icon">📦</span>
        No tienes compras aún
      </p>
    );

  return (
    <div className="container-shopping">
      <h2>Mis Compras</h2>
      {compras.map((compra, index) => (
        <div key={index} className="card-media">
          <h3>Fecha de Compra: {compra.detalleCompra.Fecha_Compra}</h3>
          <hr />
          {compra.itemShop.map((producto, index) => (
            <CardProductoShop key={index} producto={producto} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Shopping;
