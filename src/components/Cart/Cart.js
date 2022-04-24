import { useContext, useEffect, useState } from "react"
import CartContext from '../../context/CartContext'
import './Cart.css'
import { NavLink } from 'react-router-dom'
import {useNotification} from '../../notification/notification'
import { getDoc, doc } from "firebase/firestore"
import { firestoreDb } from "../../services/firebase"

const Cart = () => {

    const { cart, precioFinal, clearCart, getPrice, removeItem, removeItems, finalPrice, addItemPromocional, removeItemPromocional} = useContext(CartContext)

    const [canjeoCodigo, setCanjeoCodigo] = useState(false)
    const [canjeoCodigoDos, setCanjeoCodigoDos] = useState(false)
    const [codigo, setCodigo] = useState('')
    const { setNotification } = useNotification()

    useEffect (() => {
        if (canjeoCodigo === true){
            finalPrice(getPrice()-getPrice()/10)
        }  else {
            finalPrice(getPrice())
        } 
        if (getPrice() === 0) {
            clearCart()
        }
    },[canjeoCodigo, getPrice, finalPrice, clearCart])

    const canjear = (valor) => {
        if (canjeoCodigo || canjeoCodigoDos) {
            setNotification('warning', 'Codigo ya canjeado... no te pases de listo mocoso')
        } else {
            if (valor === 'Comision31855') {
                setCanjeoCodigo(true);
                setNotification('success', '¡Código canjeado!... la próxima vez paga el total y ayuda al tío Moe')
            } else if (valor === 'Portavasos') {
                setCanjeoCodigoDos(true);
                setNotification('success', '¡Código canjeado!... sumaste un portavasos totalmente gratis a tu pedido')

                const docRef = doc(firestoreDb, 'promocion', 'j0hiWiVPxTS0cRRqC9vw')
            
                getDoc(docRef).then(querySnapshot => {
                    const promocional = { id: querySnapshot.id, ...querySnapshot.data()}
                    addItemPromocional(promocional, 1);
                }).catch(err  => {
                    console.log(err)
                })

            } else {
                setNotification('error', 'Lo lamento, código incorrecto o vencido')
            }
        }
    }

    const resetCodigo = () => {
        removeItemPromocional('j0hiWiVPxTS0cRRqC9vw');
        setCanjeoCodigo(false);
        setCanjeoCodigoDos(false);
    }

    if(cart.length === 0) {
        return (
        <div>
            <h1 style={{color:'white'}}>No tiene productos agregados en el carrito</h1>
            <NavLink to='/elBardeMoe' className="btn btn-secondary btn-block botonCarrito">Ir a comprar</NavLink>
        </div>
        )
    }

    return (
        <div>
            <h1 style={{color:'white'}}>Carrito</h1>
            <div className="recuadro">
                <table className="table table-striped">
                    <thead><tr><th scope="col">Artículos</th><th scope="col">Precio</th><th></th></tr></thead>
                    <tbody>
                    {cart.map(prod => <tr key={prod.id}><td><b>{prod.name}</b> x {prod.quantity}</td><td>{prod.price*prod.quantity} USD ({prod.price} USD c/u)</td>{(prod.id==='j0hiWiVPxTS0cRRqC9vw') ? <td></td> : <td><button className="btn btn-warning btn-block" onClick={() => {removeItem(prod.id)}}> Eliminar un producto</button> <button className="btn btn-danger btn-block" onClick={() => {removeItems(prod.id)}}> Eliminar todos</button></td>}</tr>)}
                    <tr><td></td><td></td><td></td></tr>
                    <tr><td><input type="text" name="name" placeholder="Codigo de Descuento" onChange={e => setCodigo(e.target.value)} /></td>{canjeoCodigo ? <td>-{getPrice()/10} USD (-10%)</td> : <td></td>}{canjeoCodigo || canjeoCodigoDos ? <td><button className="btn btn-info btn-block" onClick={() => canjear(codigo)}>Canjear</button> <button className="btn btn-danger btn-block" onClick={() => resetCodigo()}>Eliminar codigo</button></td> : <td><button className="btn btn-info btn-block" onClick={() => canjear(codigo)}>Canjear</button></td>}</tr>
                    <tr><th>Total a pagar</th><th>{precioFinal} USD</th>
                    <th><button className="btn btn-danger btn-block" onClick={clearCart}>Vaciar carrito</button></th></tr>
                    </tbody>
                </table> 
                <div className="botonesPagos"> 
                    <NavLink to='/elBardeMoe' className="btn btn-info btn-block botonCarrito">Seguir comprando</NavLink><NavLink to='/formulario' className="btn btn-success btn-block">Pagar</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Cart