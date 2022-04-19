import { useState, useContext, useEffect } from 'react'
import './NavBar.css'
import Button from '../Button/Button'
import CartWidget from "../CartWidget/CarWidget"
import { Link, NavLink } from 'react-router-dom'
import Image from '../imagenes/cartelmoes.svg'
import CartContext from '../../Context/CartContext'
import { getDocs, collection } from "firebase/firestore"
import { firestoreDb } from "../../services/firebase"

const NavBar = () => {

    const [showUno, setShowUno] = useState(false)
    const [showDos, setShowDos] = useState(false)
    const [categorys, setCategorys] = useState([])
    const [columnas, setColumnas] = useState();

    const { getQuantity } = useContext(CartContext)

    useEffect(() => {
        if (getQuantity() === 0) {
          console.log("No hay productos");
          setColumnas("unaColumna");
        } else {
          console.log("Hay productos");
          setColumnas("dosColumnas");
        }
      }, [getQuantity()]);    

      const ordenCats = (categories) => {
          categories.sort(function (a,b) {
              if (a.orden > b.orden) {
                  return 1;
              } 
              if (a.orden < b.orden) {
                  return -1;
              }
              return 0
          })
      }


    useEffect(() => {
        const collectionRefCat =  collection(firestoreDb, 'category')

        getDocs(collectionRefCat).then(querySnapshot => {
            const cats = querySnapshot.docs.map(doc => {
                return { id:doc.id, ...doc.data()}
            })
            console.log("Control 2");
            ordenCats(cats);
            setCategorys(cats)
        })
    },[])
        

    return(
        <div className="headerContainer">
        <div className="cantinero">
            <div>
                <div className={`logArea ${columnas}`}>
                    <NavLink to='/Cart' style={{ textDecoration: 'none' }}><CartWidget /></NavLink>
                    <Button label="Acceder"/>
                </div>
            </div>
            <div className="moesContainer">
            <Link to="/elBardeMoe" >
                <img src={Image} alt="moes" className="moes" />
            </Link>
            </div>
            <div>
                <div className="clickMoe" onClick={() => setShowUno(!showUno)} onDoubleClick={() => setShowDos(!showDos)}></div>
                {showUno ? <div className="globoUno"></div> : null}
                {showDos ? <div className="globoDos"></div> : null}
            </div>
        </div>
        <nav className="navegador">
            <ul className="menu">
                <li className='option'><NavLink to='/elBardeMoe' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Home</b></NavLink></li>
                {categorys.map(cates => <li className='option' key={`${cates.id}`}><NavLink to={`/category/${cates.id}`} className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>{cates.label}</b></NavLink></li>)}

                {/* <li className='option'><NavLink to='/category/cervezas' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Cervezas</b></NavLink></li>
                <li className='option'><NavLink to='/category/tragos' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Tragos</b></NavLink></li>
                <li className='option'><NavLink to='/category/importados' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Importados</b></NavLink></li>
                <li className='option'><NavLink to='/category/aperitivos' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Aperitivos</b></NavLink></li>
                <li className='option'><NavLink to='/category/fichas' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Fichas</b></NavLink></li> */}
            </ul>
        </nav>
        </div>
    )
}

export default NavBar