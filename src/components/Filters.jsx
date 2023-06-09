import { useState, useId } from 'react';
import './Filters.css';

function Filters({ changeFilters }) {
  const [minPrice, setMinPrice] = useState(0);
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = event => {
    setMinPrice(event.target.value);
    changeFilters(prevFilters => ({
      ...prevFilters,
      minPrice: event.target.value
    }));
  };

  const handleChangeCategory = event => {
    changeFilters(prevFilters => ({
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
        />
        <span>{minPrice}</span>
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
