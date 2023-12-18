import React from 'react'

export const ProductFunction = () => {
    const calculatePercentage = (oldPrice, discountedPrice, setNewPrice) => {
        if(discountedPrice){
            setNewPrice((oldPrice - (oldPrice * (discountedPrice / 100))).toFixed(2));
        }
        else{
            setNewPrice(oldPrice)
        }
    }
    const formatDate = (inputDateString) => {
        const inputDate = new Date(inputDateString);

        if (isNaN(inputDate)) {
            // Handle the case where inputDateString is not a valid date
            return "Invalid Date";
        }

        const day = String(inputDate.getDate()).padStart(2, "0");
        const month = String(inputDate.getMonth() + 1).padStart(2, "0");
        const year = inputDate.getFullYear();

        const hours = String(inputDate.getUTCHours()).padStart(2, "0");
        const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0");

        const formattedDate = `${day}-${month}-${year}`;
        const formattedTime = `${hours}:${minutes}`;

        return `${formattedDate} - ${formattedTime}`;
    };
    const setCartItem = (data) => {
        const savedCart = getCartItem();
        const updatedCart = savedCart.map(item => {
            if (item.itemId === data.itemId) {
                return { ...item, quantity: data.quantity };
            }
            return item;
        });
        
        const itemExists = updatedCart.some(item => item.itemId === data.itemId);
        if (!itemExists) {
            updatedCart.push(data);
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    const getCartItem = () => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        return savedCart;
    }
    const clearCartItem = (id) => {
        const savedCart = getCartItem();
        const idString = id.toString();
        const updatedCart = savedCart.filter(item => item.itemId !== idString);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
    
    const clearAllCartItems = () => {
        localStorage.removeItem("cart");
    };

  

    return { calculatePercentage, formatDate, setCartItem, getCartItem, clearCartItem, clearAllCartItems }
}
