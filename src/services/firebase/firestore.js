import { getDocs, collection, query, where, limit, doc, getDoc, writeBatch, documentId, addDoc, Timestamp } from "firebase/firestore";
import { firestoreDb } from "./index"
import { createAdaptedProduct } from '../../adapters/productAdapter'
import { createAdaptedCategory } from "../../adapters/categoryAdapter";

export const getProducts = (categoryId) => {
  return new Promise((resolve,reject) => {
    const collectionRef = categoryId
    ? query(collection(firestoreDb, 'products'), where('category','==',categoryId), limit(10))
    : collection(firestoreDb, 'products')

    getDocs(collectionRef).then(querySnapshot => {
      const products = querySnapshot.docs.map(doc => {
        return createAdaptedProduct(doc)
      })
      resolve(products)
    }).catch(error => {
      reject(error)
    })
  })
}

export const getProductById = (id) => {
  return new Promise ((resolve,reject) => {
    const docRef = doc(firestoreDb, 'products', id)

    getDoc(docRef).then(querySnapshot => {
      const item =  createAdaptedProduct(querySnapshot)
      resolve(item)
    }).catch(error  => {
      reject(error)
    })
  })
}

export const getCats = () => {
  return new Promise ((resolve,reject) => {
    const collectionRefCat =  collection(firestoreDb, 'category')

    getDocs(collectionRefCat).then(querySnapshot => {
      const cats = querySnapshot.docs.map(doc => {
          return createAdaptedCategory(doc)
      })
      resolve(cats)
    }).catch(error  => {
      reject(error)
    })
  })
}

export const getPromo = () => {
  return new Promise ((resolve,reject) => {
    const docRef = doc(firestoreDb, 'promocion', 'j0hiWiVPxTS0cRRqC9vw')
            
    getDoc(docRef).then(querySnapshot => {
        const promocional =  createAdaptedProduct(querySnapshot)
        resolve(promocional);
    }).catch(error  => {
      reject(error)
    })
  })
}

export const createOrderAndUpdateStock = (cart, objOrder) => {
  return new Promise((resolve,reject) => {

    const objOrdenWithTimestamp = {
      ...objOrder,
      date: Timestamp.fromDate(new Date())
    }

    const batch = writeBatch(firestoreDb);
    const outOfStock = [];
    const ids = cart.map((prod) => prod.id);
    const collectionRef = collection(firestoreDb, "products");

    getDocs(query(collectionRef, where(documentId(), "in", ids)))
          .then((response) => {
            response.docs.forEach((doc) => {
              const dataDoc = doc.data();
              const prodQuantity = objOrdenWithTimestamp.items.find(
                (prod) => prod.id === doc.id
              ).quantity;
              if (dataDoc.stock >= prodQuantity) {
                batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity });
              } else {
                outOfStock.push({ id: doc.id, dataDoc });
              }
            });
          })
          .then(() => {
            if (outOfStock.length === 0) {
              const collectionRef = collection(firestoreDb, "orders");
              return addDoc(collectionRef, objOrdenWithTimestamp);
            } else {
              return Promise.reject({
                name: "outOfStockError",
                products: outOfStock,
              });
            }
          })
          .then(({ id }) => {
            batch.commit();
            resolve(id)
          }).catch(error => {
            reject(error)
          })
  })
}