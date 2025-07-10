interface ItemShop {
    idProducto: number;
    cantidad: number;
    imagenUrl: string;
    descripcionProducto: string;
  }
  
  interface CardProductoShopProps {
    producto: ItemShop;
  }
  
  const CardProductoShop = ({ producto }: CardProductoShopProps) => {
    return (
      <div className="producto">
        {/* Imagen del producto */}
        <img className="card-media-object" src={producto.imagenUrl} alt={producto.descripcionProducto} />
  
        {/* Detalles del producto */}
        <div className="card-media-body">
          <div className="card-media-body-top">
            <span className="card-media-body-heading">
              {producto.descripcionProducto}
            </span>
          </div>
          <div className="card-media-body-supporting-bottom">
            <span className="card-media-body-supporting-bottom-text subtle">
              Cantidad: {producto.cantidad}
            </span>
            <button className="card-media-body-supporting-bottom-text card-media-link u-float-right">
              Volver a comprar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CardProductoShop;
  