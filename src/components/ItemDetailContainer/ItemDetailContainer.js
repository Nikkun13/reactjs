import { useState, useEffect } from "react"
import { getItemById } from "../../asyncmock"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from 'react-router-dom'

const ItemDetailContainer = () => {

    const [item,setItem] = useState ()
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        getItemById(id).then(item => {
            setItem(item)
        }).finally(() => {
            setLoading(false)
        })
    },[id])

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