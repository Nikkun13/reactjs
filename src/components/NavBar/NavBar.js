import { useState } from 'react'
import './NavBar.css'
import Button from '../Button/Button'
import CartWidget from "../CartWidget/CarWidget"
import { Link, NavLink } from 'react-router-dom'


const NavBar = () => {

    const [show, setShow] = useState(false)

    return(
        <>
        <div className="cantinero">
            <div className="logArea"><CartWidget className="carrito" /><Button label="Acceder"/></div>
            <Link to='/'><img src="https://i.ibb.co/2ZCDqcg/cartelmoe.png" alt="moes" className="moes" /></Link>
            <div className="centrar">
                <div className="clickMoe" onClick={() => setShow(!show)}></div>
                {show ? <div className="globoUno"></div> : null}
            </div>
        </div>
        <nav className="navegador">
            <NavLink to='/' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Home</NavLink>
            <NavLink to='/category/cervezas' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Cervezas</NavLink>
            <NavLink to='/category/tragos' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Tragos</NavLink>
            <NavLink to='/category/importados' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Importados</NavLink>
            <NavLink to='/category/aperitivos' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Aperitivos</NavLink>
            <NavLink to='/category/fichas' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Fichas</NavLink>
        </nav>
        </>
    )
}

export default NavBar