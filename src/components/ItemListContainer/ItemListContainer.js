import { getProducts, getProductsByCategory } from "../../asyncmock"
import { useState, useEffect } from "react"
import ItemList from '../ItemList/ItemList'
import { useParams } from "react-router-dom"

const ItemListContainer = ({ greeting }) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    useEffect(() => {
        if(categoryId) {
            setLoading(true)

            getProductsByCategory(categoryId).then(items => {
                setProducts(items)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setLoading(true)

            getProducts().then(item => {
                setProducts(item)
            }).catch(err  => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }  

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