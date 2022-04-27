import { useContext, useState } from "react"
import CartContext from '../../context/CartContext'
import { useNotification } from "../../notification/notification";
import './Form.css'
import { NavLink } from 'react-router-dom'
import { createOrderAndUpdateStock } from "../../services/firebase/firestore";

const Form = () => {

    const [ compraRealizada, setCompraRealizada ] = useState(false);
    const { cart, clearCart, precioFinal } = useContext(CartContext)
    const { setNotification } = useNotification()
    const [loading, setLoading] = useState(false)

    const [values, setValues] = useState({
        name: "",
        phone: "",
        email: "",
      });

    function handleSubmit(evt) {
        evt.preventDefault();
    }

    function handleChange(evt) {
        const { target } = evt;
        const { name, value } = target;
        const newValues = {
          ...values,
          [name]: value,
        };
        setValues(newValues);
      }

    const createOrder = () => {

      if (values.name !== '' && values.phone !== '' && values.email !== '') {

        setLoading(true)

        const objOrder = {
          buyer: {
            name: values.name,
            phone: values.phone,
            email: values.email,
          },
          items: cart,
          total: precioFinal,
        };

        createOrderAndUpdateStock(cart,objOrder).then(id => {
        clearCart()
        setCompraRealizada(true);
        setNotification(
          "success",
          `La orden se genero correctamente, su codigo de orden es : ${id}`
        )
        }).catch((error) => {
        if (
          error &&
          error.name === "outOfStockError" &&
          error.products.length > 0
        ) {
          console.log(error.products);
        } else {
          console.log(error);
        }
        }).finally(() => {
          setLoading(false)
        })

      } else {

      setNotification(
        "error",
        `Debe completar todos los campos`
      );

      }

    };

    if (loading) {
      return <h1 style={{color:'white'}}>Se está procesando la orden...</h1>
    }

    return <>
    {compraRealizada ? 
    <>
    <h1 style={{color:'white'}}>¡Gracias por su compra!</h1>
    <NavLink to='/elBardeMoe' className="btn btn-info btn-block botonCarrito">Seguir comprando</NavLink>
    </> :
    <>
    <h1 style={{color:'white'}}>Formulario de Compra</h1>
            <form className='formulario' onSubmit={handleSubmit}>
                <div className='seccion'>
                    <b>Total a pagar = {precioFinal} USD</b>
                </div>
                <div className='seccion'>
                <label htmlFor="name">Nombre: </label>
                <input id="name" placeholder="Nombre" type="text" name="name" className='sepEspacios' value={values.name} onChange={handleChange} required></input>
                </div>
                <div className='seccion'>
                <label htmlFor="phone">Telefono: </label>
                <input id="phone" placeholder="Telefono" type="tel" name="phone" className='sepEspacios' value={values.phone} onChange={handleChange} required></input>
                </div>
                <div className='seccion'>
                <label htmlFor="email">Email: </label>
                <input id="email" placeholder="Email" type="email" name="email" className='sepEspacios' value={values.email} onChange={handleChange} required></input>
                </div>
                <div className='seccion sepBotones'>
                <input type="submit" className="btn btn-success" value="Pagar" onClick={() => {
              createOrder();
            }}></input>
                </div>
            </form>
            </>}
            </>
}

export default Form