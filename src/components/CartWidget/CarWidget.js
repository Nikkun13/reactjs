import './CarWidget.css'
import { useContext } from 'react';
import CartContext from '../../context/CartContext'

const CartWidget = () => {

    const { getQuantity } = useContext(CartContext)

    if ( getQuantity() === 0) {
        return null
    }

    return (
        <div className="carro">
            <img src="https://i.ibb.co/5cYj2TR/carrito2.png" alt="imagen de carrito"/>
            { getQuantity() } 
        </div>
    )
}

export default CartWidget