export const cartInitialState =
  JSON.parse(window.localStorage.getItem('cart')) || [];

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
};

// update localStorage when cart changes
export const updateLocalStorage = cart => {
  window.localStorage.setItem('cart', JSON.stringify(cart));
};

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = actionPayload;
      const productInCart = state.findIndex(item => item.id === id);

      // Si el producto ya está en el carrito, entonces aumentamos la cantidad.
      if (productInCart >= 0) {
        // con structuredClone
        // const newState = structuredClone(state);
        // newState[productInCart].quantity += 1;

        //con map
        // const newState = state.map((item, index) => {
        //   if (index === productInCart) {
        //     return {
        //       ...item,
        //       quantity: item.quantity + 1
        //     };
        //   }

        //   return item;
        // });

        // con spread operator
        const newState = [
          ...state.slice(0, productInCart),
          {
            ...state[productInCart],
            quantity: state[productInCart].quantity + 1
          },
          ...state.slice(productInCart + 1)
        ];

        updateLocalStorage(newState);
        return newState;
      }

      // Si el producto no está en el carrito, entonces lo agregamos.
      const newState = [...state, { ...actionPayload, quantity: 1 }];

      updateLocalStorage(newState);
      return newState;
    }
    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload;
      const newState = state.filter(item => item.id !== id);

      updateLocalStorage(newState);
      return newState;
    }
    case CART_ACTION_TYPES.CLEAR_CART: {
      const newState = [];
      updateLocalStorage(newState);
      return newState;
    }
  }

  return state;
};
