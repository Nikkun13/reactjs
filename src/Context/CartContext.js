import { createContext, useState } from "react";
import {useNotification} from '../notification/notification'

const Context = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [precioFinal, setPrecioFinal] = useState()
    const { setNotification } = useNotification()

    const addItem = (product, quantity) => {

        let repetido=false;
        cart.map((prod) => {
            if(prod.id===product.id) {
                prod.quantity = prod.quantity + quantity;
                if (prod.quantity > prod.stock) {
                    prod.quantity = prod.stock;
                    setNotification('warning', 'No hay suficiente stock del producto seleccionado, se agrego el existente al carrito')
                } else {
                    setNotification('success', 'La cantidad seleccionada se agregó correctamente al carrito')
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
            setNotification('success', 'La cantidad seleccionada se agregó correctamente al carrito')
            setCart([...cart, objItemCart ])
        }

            
    }

    const addItemPromocional = (product, quantity) => {

        const objItemCart = {
            ...product,
            quantity
        }
        setCart([...cart, objItemCart ])

    }

    const removeItemPromocional = (id) => {
                    let newCart = cart.filter((item) => item.id !== id);
                    setCart([...newCart])
                    
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

    const removeItems = (id) => {
        cart.map((prod) => {
            if(prod.id===id) {
                    let newCart = cart.filter((item) => item.id !== id);
                    setCart([...newCart])
                }    
            }
        )
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

    const finalPrice = (ultimoPrecio) => {
        setPrecioFinal(ultimoPrecio)
    }

    return (
        <Context.Provider value={{ 
            cart,
            precioFinal, 
            addItem,
            clearCart,
            getQuantity,
            getPrice,
            removeItem,
            removeItems,
            finalPrice,
            addItemPromocional,
            removeItemPromocional
        }}>
            {children}
        </Context.Provider>
    )
}

export default Context