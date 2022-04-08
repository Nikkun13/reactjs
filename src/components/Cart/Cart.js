import { useContext, useState } from "react"
import CartContext from '../../Context/CartContext'
import './Cart.css'

const Cart = () => {

    const { cart, clearCart, getPrice, removeItem} = useContext(CartContext)

    const [canjeoCodigo, setCanjeoCodigo] = useState(false)
    const [codigo, setCodigo] = useState('')

    const canjear = (valor) => {
        if (canjeoCodigo) {
            console.log('Ya lo canjeo')
        } else {
            if (valor === 'Comision31855') {
                setCanjeoCodigo(true);
                console.log('codigo canjeado')
            } else {
                console.log('codigo invalido')
                console.log(valor)
            }
        }
    }

    return (
        <div>
            <h1 style={{color:'white'}}>Carrito</h1>
            <div className="recuadro">
                <table className="table table-striped">
                    <thead><tr><th scope="col">Artículos</th><th scope="col">Precio</th><th></th></tr></thead>
                    <tbody>
                    {cart.map(prod => <tr key={prod.id}><td><b>{prod.name}</b> x {prod.quantity}</td><td>{prod.price*prod.quantity} USD ({prod.price} USD c/u)</td><td><button className="btn btn-secondary btn-block" onClick={() => {removeItem(prod.id)}}> Eliminar un producto</button></td></tr>)}
                    <tr><td></td><td></td><td></td></tr>
                    <tr><td><input type="text" name="name" placeholder="Codigo de Descuento" onChange={e => setCodigo(e.target.value)} /></td>{canjeoCodigo ? <td>-{getPrice()/10} USD (-10%)</td> : <td></td>}<td><button className="btn btn-secondary btn-block" onClick={() => canjear(codigo)}>Canjear</button></td></tr>
                    <tr><th>Total a pagar</th>
                    {canjeoCodigo ? <th>{0.9*getPrice()} USD</th> : <th>{getPrice()} USD</th>}
                    <th><button className="btn btn-secondary btn-block" onClick={clearCart}>Vaciar carrito</button></th></tr>
                    </tbody>
                </table>  
                <button className="btn btn-secondary btn-block">Pagar</button>
            </div>
        </div>
    )
}

export default Cart