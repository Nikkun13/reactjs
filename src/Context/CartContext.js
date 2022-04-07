import { createContext, useState } from "react";

const Context = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    console.log(cart)

    const addItem = (product, quantity) => {

        let repetido=false;
        cart.map((prod) => {
            if(prod.id===product.id) {
                prod.quantity = prod.quantity + quantity;
                if (prod.quantity > prod.stock) {
                    prod.quantity = prod.stock;
                    alert('El producto seleccionado supera el stock disponible. Se ha modificado el número para que coincida con el stock máximo')
                }
                repetido=true;
                setCart([...cart])
            }
        })
        if (repetido === false) {
            const objItemCart = {
                ...product,
                quantity
            }
            setCart([...cart, objItemCart ])
        }

            
    }

    const clearCart = () => {
        setCart([])
    }

    const removeItem = (id) => {
        cart.map((prod) => {
            if(prod.id===id) {
                prod.quantity = prod.quantity - 1;
                if (prod.quantity === 0) {
                    let newCart = cart.filter((item) => item.id !== id);
                    setCart([...newCart])
                } else {
                    setCart([...cart])
                }
                    
            }
        })
    }

    const getQuantity = () => {
        let count = 0
        cart.forEach(prod => {
            count = count + prod.quantity
        })

        return count
    }

    const getPrice = () => {
        let countP = 0
        cart.forEach(prod => {
            countP = countP + prod.quantity*prod.price
        })

        return countP
    }

    return (
        <Context.Provider value={{ 
            cart, 
            addItem,
            clearCart,
            getQuantity,
            getPrice,
            removeItem
        }}>
            {children}
        </Context.Provider>
    )
}

export default Context