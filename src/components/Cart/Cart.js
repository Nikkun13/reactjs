import { useContext, useState } from "react";
import CartContext from "../../Context/CartContext";
import "./Cart.css";
import { NavLink } from "react-router-dom";
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

const Cart = () => {
  const { cart, clearCart, getPrice, removeItem, removeItems } =
    useContext(CartContext);

  const [canjeoCodigo, setCanjeoCodigo] = useState(false);
  const [canjeoCodigoDos, setCanjeoCodigoDos] = useState(false);
  const [codigo, setCodigo] = useState("");
  const { setNotification } = useNotification();

  const createOrder = () => {
    const objOrder = {
      buyer: {
        name: "Sebastian",
        phone: "123456789",
        email: "sebastian@test.com",
      },
      items: cart,
      total: getPrice(),
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
          return addDoc(collectionRef, objOrder); //Promesa
        } else {
          return Promise.reject({
            name: "outOfStockError",
            products: outOfStock,
          });
        }
      })
      .then(({ id }) => {
        batch.commit();
        console.log("se genero la orden");
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

    // const collectionRef = collection(firestoreDb, "orders");
    // addDoc(collectionRef, objOrder).then((response) => {
    //   console.log(response);
    // });
  };

  const canjear = (valor) => {
    if (canjeoCodigo || canjeoCodigoDos) {
      setNotification(
        "warning",
        "Codigo ya canjeado... no te pases de listo mocoso"
      );
    } else {
      if (valor === "Comision31855") {
        setCanjeoCodigo(true);
        setNotification(
          "success",
          "¡Código canjeado!... la próxima vez paga el total y ayuda al tío Moe"
        );
      } else if (valor === "Portavasos") {
        setCanjeoCodigoDos(true);
        setNotification(
          "success",
          "¡Código canjeado!... sumaste un portavasos totalmente gratis a tu pedido"
        );
      } else {
        setNotification("error", "Lo lamento, código incorrecto o vencido");
      }
    }
  };

  const resetCodigo = () => {
    setCanjeoCodigo(false);
    setCanjeoCodigoDos(false);
  };

  if (cart.length === 0) {
    return (
      <div>
        <h1 style={{ color: "white" }}>
          No tiene productos agregados en el carrito
        </h1>
        <NavLink
          to="/elBardeMoe"
          className="btn btn-secondary btn-block botonCarrito"
        >
          Ir a comprar
        </NavLink>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ color: "white" }}>Carrito</h1>
      <div className="recuadro">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Artículos</th>
              <th scope="col">Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <b>{prod.name}</b> x {prod.quantity}
                </td>
                <td>
                  {prod.price * prod.quantity} USD ({prod.price} USD c/u)
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-block"
                    onClick={() => {
                      removeItem(prod.id);
                    }}
                  >
                    {" "}
                    Eliminar un producto
                  </button>{" "}
                  <button
                    className="btn btn-danger btn-block"
                    onClick={() => {
                      removeItems(prod.id);
                    }}
                  >
                    {" "}
                    Eliminar todos
                  </button>
                </td>
              </tr>
            ))}
            {canjeoCodigoDos && (
              <tr key="portavasos">
                <td>
                  <b>Portavasos</b> x 1
                </td>
                <td>Gratis</td>
                <td></td>
              </tr>
            )}
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Codigo de Descuento"
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </td>
              {canjeoCodigo ? (
                <td>-{getPrice() / 10} USD (-10%)</td>
              ) : (
                <td></td>
              )}
              {canjeoCodigo || canjeoCodigoDos ? (
                <td>
                  <button
                    className="btn btn-info btn-block"
                    onClick={() => canjear(codigo)}
                  >
                    Canjear
                  </button>{" "}
                  <button
                    className="btn btn-danger btn-block"
                    onClick={() => resetCodigo()}
                  >
                    Eliminar codigo
                  </button>
                </td>
              ) : (
                <td>
                  <button
                    className="btn btn-info btn-block"
                    onClick={() => canjear(codigo)}
                  >
                    Canjear
                  </button>
                </td>
              )}
            </tr>
            <tr>
              <th>Total a pagar</th>
              {canjeoCodigo ? (
                <th>{getPrice() - getPrice() / 10} USD</th>
              ) : (
                <th>{getPrice()} USD</th>
              )}
              <th>
                <button
                  className="btn btn-danger btn-block"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
              </th>
            </tr>
          </tbody>
        </table>
        <div className="botonesPagos">
          <NavLink
            to="/elBardeMoe"
            className="btn btn-info btn-block botonCarrito"
          >
            Seguir comprando
          </NavLink>
          <button
            className="btn btn-success btn-block"
            onClick={() => {
              createOrder();
            }}
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
