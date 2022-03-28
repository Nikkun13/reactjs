import Item from '../Item/Item'
import './ItemList.css'

const ItemList = ({products}) => {
    return(
        <div className="centrado">
            {products.map(product => <Item key={product.id} product={product} />)}
        </div>
    )
}

export default ItemList