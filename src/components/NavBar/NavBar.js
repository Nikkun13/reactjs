import { useState } from 'react'
import './NavBar.css'
import Button from '../Button/Button'
import CartWidget from "../CartWidget/CarWidget"
import { Link, NavLink } from 'react-router-dom'
import Image from '../imagenes/cartelmoes.svg'


const NavBar = () => {

    const [show, setShow] = useState(false)

    return(
        <div className="headerContainer">
        <div className="cantinero">
            <div>
                <div className="logArea"><CartWidget /><Button label="Acceder"/></div>
            </div>
            <div className="moesContainer">
            <Link to="/elBardeMoe" >
                <img src={Image} alt="moes" className="moes" />
            </Link>
            </div>
            <div>
                <div className="clickMoe" onClick={() => setShow(!show)}></div>
                {show ? <div className="globoUno"></div> : null}
            </div>
        </div>
        <nav className="navegador">
            <ul className="menu">
                <li className='option'><NavLink to='/elBardeMoe' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Home</b></NavLink></li>
                <li className='option'><NavLink to='/category/cervezas' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Cervezas</b></NavLink></li>
                <li className='option'><NavLink to='/category/tragos' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Tragos</b></NavLink></li>
                <li className='option'><NavLink to='/category/importados' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Importados</b></NavLink></li>
                <li className='option'><NavLink to='/category/aperitivos' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Aperitivos</b></NavLink></li>
                <li className='option'><NavLink to='/category/fichas' className={({ isActive }) => isActive ? 'botonActivo' : 'boton'}><b>Fichas</b></NavLink></li>
            </ul>
        </nav>
        </div>
    )
}

export default NavBar