import './CarWidget.css'
import { useContext } from 'react';
import CartContext from '../../Context/CartContext'

const CartWidget = () => {

    const { getQuantity } = useContext(CartContext)

    return (
        <div className="carro">
            <img src="https://i.ibb.co/5cYj2TR/carrito2.png" alt="imagen de carrito"/>
            { getQuantity() } 
        </div>
    )
}

export default CartWidget