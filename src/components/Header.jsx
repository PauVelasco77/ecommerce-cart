import Filters from './Filters.jsx';

function Header({ changeFilters }) {
  return (
    <header>
      <h1>React App</h1>
      <Filters changeFilters={changeFilters} />
    </header>
  );
}

export default Header;
