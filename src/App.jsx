import { useState } from 'react';
import { Products } from './components/Products';
import { products as initialProducts } from './mocks/products.json';
import Header from './components/Header';

function useFilters() {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  });

  const filterProducts = products => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
      );
    });
  };

  return { filterProducts, setFilters };
}

function App() {
  const { filterProducts, setFilters } = useFilters();

  const [products] = useState(initialProducts);
  const filteredProducts = filterProducts(products);

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
    </>
  );
}

export default App;
