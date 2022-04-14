import { useState, useEffect } from "react"
import ItemList from '../ItemList/ItemList'
import { useParams } from "react-router-dom"
import { getDocs, collection, query, where } from "firebase/firestore"
import { firestoreDb } from "../../services/firebase"

const ItemListContainer = ({ greeting }) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    useEffect(() => {

        setLoading(true)

        const collectionRef = categoryId ? query(collection(firestoreDb, 'products'),where('category','==', categoryId)) : collection(firestoreDb, 'products')

        getDocs(collectionRef).then(querySnapshot => {
            const products = querySnapshot.docs.map(doc => {
                return { id:doc.id, ...doc.data()}
            })
            setProducts(products)
        }).catch(err  => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })

        return (() => {
            setProducts([])
        })          
    }, [categoryId])

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