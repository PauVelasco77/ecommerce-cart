import { createContext } from 'react';
import useCartReducer from '../hooks/useCartReducer';
// Este es el contexto que vamos a usar para compartir los filtros entre los componentes.
export const CartContext = createContext();

// Este es el componente que vamos a usar para proveer el contexto a los componentes hijos.
export function CartProvider({ children }) {
  const { addToCart, removeFromCart, clearCart, state } = useCartReducer();

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart
      }}>
      {children}
    </CartContext.Provider>
  );
}
