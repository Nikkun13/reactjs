import { useState } from "react"
import ItemList from '../ItemList/ItemList'
import { useParams } from "react-router-dom"
import { getProducts } from "../../services/firebase/firestore"
import { useAsync } from '../../hooks/useAsync'
import { useNotification } from '../../notification/notification'

const ItemListContainer = ({ greeting }) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    const { setNotification } = useNotification()

    useAsync(
        setLoading, 
        () => getProducts(categoryId), 
        setProducts, 
        () => setNotification('error', 'Hubo un error al cargar los productos'), 
        [categoryId]
    )

    if(loading) {
        return <h1 style={{color:'white'}}>Cargando productos...</h1>
    }

    if(products.length === 0) {
        return <h1 style={{color:'white'}}>No hay productos de esta categoria</h1>
    }

    return(
        <>
        <h1 style={{color:'white'}}>{greeting}</h1>
        <ItemList products={products} />
        </>
    )
}

export default ItemListContainer