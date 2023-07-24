import { useId } from 'react';
import './Filters.css';
import useFilters from '../hooks/useFilters';

function Filters() {
  const { setFilters, filters } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = event => {
    setFilters(prevFilters => ({
      ...prevFilters,
      minPrice: event.target.value
    }));
  };

  const handleChangeCategory = event => {
    setFilters(prevFilters => ({
      ...prevFilters,
      category: event.target.value
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor="price">Min Price</label>
        <input
          type="range"
          id={minPriceFilterId}
          min={'0'}
          max={'1000'}
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>{filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">All</option>
          <option value="laptops">Laptops</option>
          <option value="home-decoration">Home decoration</option>
          <option value="smartphones">Smartphones</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>
    </section>
  );
}

export default Filters;
