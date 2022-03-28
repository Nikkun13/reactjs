import './Item.css'
import { Link } from 'react-router-dom'

const Item = ({product}) => {

    return (
        <div className="card tarjeta" key={product.id}>
            <img className="card-img-top imagenProducto" src={product.img} alt="Card cap"/>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text"><b>{product.price} U$D</b></p>
                <div className='detalles'>
                    <Link to={`/item/${product.id}`} className='destalle'>Ver detalles</Link>
                </div>
            </div>
        </div>
    )
}

export default Item