import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartData = JSON.parse(localStorage.getItem("cart"));

  const [productCart, setProductCart] = useState((cartData && cartData) || []);

  const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const addProductToCart = (product) => {
    setProductCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.productId === product.productId
      );
      let updatedCart;

      if (existingProductIndex >= 0) {
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeProductFromCart = (productId) => {
    setProductCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.productId !== productId
      );
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeCartFromLocalStorage = () => {
    setProductCart([]);
    localStorage.removeItem("cart");
  };

  const updateProductQuantity = (productId, quantity) => {
    console.log("updateProductQuantity: first");
    setProductCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.productId === productId) {
          console.log("updateProductQuantity: seconed");
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      });

      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  useEffect(() => {
    saveCartToLocalStorage(productCart);
  }, [productCart]);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        removeCartFromLocalStorage,
        removeProductFromCart,
        updateProductQuantity,
        productCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};
