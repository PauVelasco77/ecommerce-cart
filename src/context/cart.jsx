import { createContext, useState } from 'react';
// Este es el contexto que vamos a usar para compartir los filtros entre los componentes.
export const CartContext = createContext();
// Este es el componente que vamos a usar para proveer el contexto a los componentes hijos.
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = product => {
    // Si el producto ya está en el carrito, entonces aumentamos la cantidad.
    const productInCart = cart.findIndex(item => item.id === product.id);

    if (productInCart >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCart].quantity += 1;
      return setCart(newCart);
    }

    // Si el producto no está en el carrito, entonces lo agregamos.
    return setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart
      }}>
      {children}
    </CartContext.Provider>
  );
}
