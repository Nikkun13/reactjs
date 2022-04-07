import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Cart from './components/Cart/Cart'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { CartContextProvider } from './Context/CartContext'

function App() {

  return (
    <div className="App">
      <CartContextProvider>
      <BrowserRouter>
        <header className="App-header container">
          <NavBar />
        </header>
        <main className="App-main container"> 
          <Routes>
            <Route path='/elBardeMoe' element={<ItemListContainer className="lista" greeting="Bienvenidos al Bar de Moe" />} />
            <Route path='/category/:categoryId' element={<ItemListContainer className="lista" greeting="Bienvenidos al Bar de Moe" />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<h1>Página no encontrada. ERROR 404</h1>} />
          </Routes>
        </main>
        <footer className="App-footer container">
          <p>Trabajo realizado por Nicolas Arcieri</p>
        </footer>
      </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
