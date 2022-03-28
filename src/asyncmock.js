const products = [

    {id: 1, name: 'Duff', price: 5, description: 'La clásica cerveza en su presentación más común. Deliciosa.', category: 'cervezas', img: 'https://i.ibb.co/bH8tKvW/Cerveza.png', stock: 15},
    {id: 2, name: 'Llamarada Moe', price: 10, description: '¿LLamarada Homero? No se de que me hablas, siempre fueron llamaradas Moe, porque las hago yo, Moe.', category: 'tragos', img: 'https://i.ibb.co/WxkMNnW/Llamarada.png', stock: 10},
    {id: 3, name: 'Perfume en un sombrero de hombre con una ciruela flotando', price: 20, description: 'Aunque no lo creas es muy comun, siempre tengo uno preparado.', category: 'importados', img: 'https://i.ibb.co/Ks3Ng8n/Perfume.png', stock: 5},
    {id: 4, name: 'Duff Lite', price: 6, description: 'Cerveza Lite. Casi igual a la clásica... algunos dicen que es igual.', category: 'cervezas', img: 'https://i.ibb.co/gz6ByYp/dufflite.png', stock: 7},
    {id: 5, name: 'Bartini', price: 12, description: 'El martini favorito de la mafia. Estoy obligado a jurar que no es un niño de 10 años quien lo prepara.', category: 'tragos', img: 'https://i.ibb.co/wcQJj0z/martini.png', stock: 8},
]

export const getProducts = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(products)
        },2000)
    })
}

export const getItemById = (id) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(products.find(item => item.id === parseInt(id)))
        },2000)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise ((resolve,reject) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        },2000)
    })
}