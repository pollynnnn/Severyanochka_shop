import Header from './components/Header';
import './App.css'
import Mainpage from './pages/Mainpage';
import Footer from './components/Footer';
import Basket from './pages/Basket';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app-shell'>
     <Header/>
      <main className='app-main'>
        <Routes> 
          <Route path="/" element={<Mainpage/>} />
          <Route path="/basket" element={<Basket/>} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
