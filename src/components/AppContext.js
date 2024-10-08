'use client';

import { SessionProvider } from "next-auth/react";
import { useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
    let price = Number(cartProduct.price); // Ensure price is a number

    if (cartProduct.size) {
        price += Number(cartProduct.size.price); // Convert size price to a number
    }

    if (cartProduct?.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
            price += Number(extra.price); // Convert each extra price to a number
        }
    }

    return price;
}


export function AppProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, []);

    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    function removeCartProduct(indexToRemove) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
        });
        toast.success("Removed form cart!");
    }

    function saveCartProductsToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    function addToCart(product, size = null, extras = []) {
        setCartProducts(prevProducts => {
            const cartProduct = { ...product, size, extras };
            const newProducts = [...prevProducts, cartProduct];
            saveCartProductsToLocalStorage(newProducts); // Save after updating the cart
            return newProducts;
        });
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts,
                setCartProducts,
                addToCart,
                clearCart,
                removeCartProduct,
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}
