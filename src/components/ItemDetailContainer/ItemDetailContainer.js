import { useState, useEffect } from "react"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from 'react-router-dom'
import { firestoreDb } from "../../services/firebase"
import {getDoc, doc } from "firebase/firestore"

const ItemDetailContainer = () => {

    const [item,setItem] = useState ()
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        setLoading(true)

        const docRef = doc(firestoreDb, 'products', id)

        getDoc(docRef).then(querySnapshot => {
            const item = { id: querySnapshot.id, ...querySnapshot.data()}
            setItem(item)
        }).catch(err  => {
            console.log(err)
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