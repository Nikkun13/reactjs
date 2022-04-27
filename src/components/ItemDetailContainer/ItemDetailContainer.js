import { useState } from "react"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from 'react-router-dom'
import { getProductById } from "../../services/firebase/firestore"
import { useAsync } from '../../hooks/useAsync'
import { useNotification } from '../../notification/notification'

const ItemDetailContainer = () => {

    const [item,setItem] = useState ()
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    const { setNotification } = useNotification()

    useAsync(
        setLoading, 
        () => getProductById(id), 
        setItem, 
        () => setNotification('error', 'Hubo un error al cargar el producto'), 
        [id]
    )

    if(loading) {
        return <h1 style={{color:'white'}}>Cargando producto...</h1>
    }

    return(
        <>
        <h1 style={{color:'white'}}>Detalles</h1>
        <div className="centradoItem">
            <ItemDetail {...item} />
        </div>
        </>
    )

}

export default ItemDetailContainer