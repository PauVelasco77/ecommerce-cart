import { createContext, useState } from 'react';
// Este es el contexto que vamos a usar para compartir los filtros entre los componentes.
export const FiltersContext = createContext();
// Este es el componente que vamos a usar para proveer el contexto a los componentes hijos.
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
