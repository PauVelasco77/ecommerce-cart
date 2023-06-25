import { useContext, useState } from 'react';
import { Products } from './components/Products';
import { products as initialProducts } from './mocks/products.json';
import Header from './components/Header';
import Footer from './components/Footer';
import { IS_DEVELOPMENT } from './config';
import { FiltersContext } from './context/filters';

function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext);
  console.log(filters);
  const filterProducts = products => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
      );
    });
  };

  return { filterProducts, setFilters, filters };
}

function App() {
  const { filterProducts, setFilters, filters } = useFilters();

  const [products] = useState(initialProducts);
  const filteredProducts = filterProducts(products);

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer filters={filters} />}
    </>
  );
}

export default App;
