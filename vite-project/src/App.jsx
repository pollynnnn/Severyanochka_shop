import Header from './components/Header';
import './App.css'
import Mainpage from './pages/Mainpage';
import Footer from './components/Footer';
import Basket from './pages/Basket';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
     <Header/>
      <Routes>
        <Route path="/" element={<Mainpage/>} />
        <Route path="/basket" element={<Basket/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
