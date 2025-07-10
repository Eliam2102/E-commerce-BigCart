import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../../../redux/store';
import { cargarProductos } from '../../../controllers/productoController';
import CardProduct from './CardProduct';
import SkeletonProductLoader from './SkeletonProducto';
import '../assets/styles/SectionProduct.css';

const categories = [
  { id: 1, name: 'Electrónica' },
  { id: 2, name: 'Hogar' },
  { id: 3, name: 'Deportes' },
  { id: 4, name: 'Moda' },
  { id: 5, name: 'Alimentos' },
  { id: 6, name: 'Juguetes' },
  { id: 7, name: 'Salud y Belleza' },
  { id: 8, name: 'Automotriz' },
  { id: 9, name: 'Libros' },
  { id: 10, name: 'Mascotas' },
];

const priceRanges = [
  { id: 1, label: '0-50', min: 0, max: 50 },
  { id: 2, label: '50-100', min: 50, max: 100 },
  { id: 3, label: '100-200', min: 100, max: 200 },
];

const CatalogsProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productos, isLoading, error } = useSelector(
    (state: RootState) => state.productos
  );
  // Obtiene los parámetros de búsqueda de la URL
  const [searchParams] = useSearchParams();
  // Llama al método `get` en el objeto `URLSearchParams`
  const categoryQuery = searchParams.get('name'); // Leer el parámetro 'category' que paso desde el link de la Url
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [filterName, setFilterName] = useState<string>(''); 
  const [isFiltering, setIsFiltering] = useState(false);
  const [showFilters, setShowFilters] = useState(false); 

  //useEffect para la parte de los productos filtrados por categoria
  useEffect(() => {
    if (categoryQuery) {
      // Encontrar el ID correspondiente a la categoría
      const name = categories.find((cat) => cat.name === categoryQuery);
      if (name) {
        setSelectedCategory(name.id);
      }
    }
  }, [categoryQuery]);
  
  //Este es para cargar los productos
  useEffect(() => {
    dispatch(cargarProductos());
  }, [dispatch]);

  const handleFilterCategory = (categoryId: number) => {
    setIsFiltering(true);
    setSelectedCategory(categoryId);

    setTimeout(() => {
      setIsFiltering(false);
    }, 500);
  };

  const handleFilterPrice = (min: number, max: number) => {
    setIsFiltering(true);
    setSelectedPriceRange({ min, max });

    setTimeout(() => {
      setIsFiltering(false);
    }, 500);
  };

  const filteredProducts = productos.filter((product) => {
    const matchesCategory = selectedCategory ? product.idCategoria === selectedCategory : true;
    const matchesPrice =
      selectedPriceRange
        ? product.precio >= selectedPriceRange.min && product.precio <= selectedPriceRange.max
        : true;
        const normalizeText = (text: string): string => 
          text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        const matchesName = normalizeText(product.nombreProducto.toLowerCase())
          .includes(normalizeText(filterName.toLowerCase()));
    return matchesCategory && matchesPrice && matchesName && normalizeText;
  });

  return (
    <div className="catalog-container">
      <button
        className="filter-toggler"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
      </button>
      {/* Filtros */}
      <aside className={`filters ${showFilters ? 'show' : ''}`}>
        <h3>Filtrar por</h3>
        <div className="filter-group">
          <h4>Categorías</h4>
          {categories.map((category) => (
            <button
              key={category.id}
              className="filter-button"
              onClick={() => handleFilterCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="filter-group">
          <h4>Precio</h4>
          {priceRanges.map((range) => (
            <button
              key={range.id}
              className="filter-button"
              onClick={() => handleFilterPrice(range.min, range.max)}
            >
              {range.label}
            </button>
          ))}
        </div>
        <button
          className="clear-filters-btn"
          onClick={() => {
            setSelectedCategory(null);
            setSelectedPriceRange(null);
            setFilterName(''); 
            setIsFiltering(true);
            setTimeout(() => setIsFiltering(false), 500);
          }}
        >
          Limpiar filtros
        </button>
      </aside>

      {/* Productos */}
      <section className="products-section">
        <h2>Catálogo de Productos</h2>
        {/* Input para filtrar por nombre */}
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="filter-input"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        {isLoading || isFiltering ? (
          <div className="skeleton-loader products-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonProductLoader key={index} />
            ))}
          </div>
        ) : error ? (
          <p>Error al cargar productos: {error}</p>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <CardProduct key={product.idProducto} product={product} />
            ))}
          </div>
        ) : (
          <p className="no-products">
            <span className="no-products-icon">📦</span>
            No hay productos disponibles.
          </p>
        )}
      </section>
    </div>
  );
};

export default CatalogsProducts;