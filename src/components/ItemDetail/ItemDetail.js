import ItemCount from '../ItemCount/ItemCount'
import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './ItemDetail.css'
import CartContext from '../../Context/CartContext'
import {useNotification} from '../../notification/notification'

const ItemDetail = (product) => {

    const [quantity, setQuantity] = useState(0) 

    const { addItem } = useContext(CartContext)
    const { setNotification } = useNotification()

    const onAdd = (count) => {
        if (count > 0) {
            setQuantity(count);
            addItem(product, count);
        } else {
            setNotification('error', 'Debe haber al menos un producto seleccionado para agregar')
        }
    }

    const [stock, setStock] = useState(product.stock) 

    const newStock = (quantity) => {
        setStock(stock-quantity);
    }

    return (
        <div className="card tarjetaDos" key={product.id}>
            <img className="card-img-top imagenProducto" src={product.img} alt="Card cap"/>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><b>{product.price} U$D</b></p>
                {quantity === 0 ? <ItemCount initial={0} stock={stock} onAdd={onAdd} newStock={newStock}/> : 
                <><ItemCount initial={0} stock={stock} onAdd={onAdd} newStock={newStock}/>
                <NavLink to='/Cart' className="btn btn-secondary btn-block botonCarrito">Terminar compra</NavLink></>}
                <p className="card-text">Stock: {stock}</p>
            </div>
        </div>
    )

}

export default ItemDetail