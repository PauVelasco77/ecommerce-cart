import { createContext, useReducer } from 'react';
// Este es el contexto que vamos a usar para compartir los filtros entre los componentes.
export const CartContext = createContext();

const initialState = [];
const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload;
      const productInCart = state.findIndex(item => item.id === id);

      // Si el producto ya está en el carrito, entonces aumentamos la cantidad.
      if (productInCart >= 0) {
        const newCart = structuredClone(state);
        newCart[productInCart].quantity += 1;
        return newCart;
      }

      // Si el producto no está en el carrito, entonces lo agregamos.
      return [...state, { ...actionPayload, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload;
      return state.filter(item => item.id !== id);
    }
    case 'CLEAR_CART': {
      return initialState;
    }
  }

  return state;
};

// Este es el componente que vamos a usar para proveer el contexto a los componentes hijos.
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = product => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = product => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

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
