import { useContext, useState } from "react"
import CartContext from '../../context/CartContext'
import { useNotification } from "../../notification/notification";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  documentId,
  writeBatch,
} from "firebase/firestore";
import { firestoreDb } from "../../services/firebase";
import './Form.css'
import { NavLink } from 'react-router-dom'

const Form = () => {

    const [ compraRealizada, setCompraRealizada ] = useState(false);
    const { cart, clearCart, precioFinal } = useContext(CartContext)
    const { setNotification } = useNotification()

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

        const objOrder = {
          buyer: {
            name: values.name,
            phone: values.phone,
            email: values.email,
          },
          items: cart,
          total: precioFinal,
        };
    
        const batch = writeBatch(firestoreDb);
        const outOfStock = [];
        const ids = cart.map((prod) => prod.id);
        const collectionRef = collection(firestoreDb, "products");
    
        getDocs(query(collectionRef, where(documentId(), "in", ids)))
          .then((response) => {
            response.docs.forEach((doc) => {
              const dataDoc = doc.data();
              const prodQuantity = objOrder.items.find(
                (prod) => prod.id === doc.id
              ).quantity;
              if (dataDoc.stock >= prodQuantity) {
                batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity });
              } else {
                outOfStock.push({ id: doc.id, dataDoc });
              }
            });
          })
          .then(() => {
            if (outOfStock.length === 0) {
              const collectionRef = collection(firestoreDb, "orders");
              return addDoc(collectionRef, objOrder);
            } else {
              return Promise.reject({
                name: "outOfStockError",
                products: outOfStock,
              });
            }
          })
          .then(({ id }) => {
            batch.commit();
            setNotification(
              "success",
              `La orden se genero correctamente, su codigo de orden es : ${id}`
            );
          })
          .catch((error) => {
            if (
              error &&
              error.name === "outOfStockError" &&
              error.products.length > 0
            ) {
              console.log(error.products);
            } else {
              console.log(error);
            }
          });

        clearCart();
        setCompraRealizada(true);

      } else {

        setNotification(
          "error",
          `Debe completar todos los campos`
        );

      }
      };

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