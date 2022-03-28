import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header container">
          <NavBar />
        </header>
        <main className="App-main container"> 
          <Routes>
            {/* <ItemListContainer className="lista" greeting="Bienvenidos al Bar de Moe"/> */}
            <Route path='/' element={<ItemListContainer className="lista" greeting="Bienvenidos al Bar de Moe" />} />
            <Route path='/category/:categoryId' element={<ItemListContainer className="lista" greeting="Bienvenidos al Bar de Moe" />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
            <Route path='*' element={<h1>Página no encontrada. ERROR 404</h1>} />
          </Routes>
        </main>
        <footer className="App-footer container">
          <p>Trabajo realizado por Nicolas Arcieri</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
