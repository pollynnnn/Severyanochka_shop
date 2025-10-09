import React, { useState } from 'react'
import Logo from '../assets/logo.svg'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { SlBasket } from "react-icons/sl";
import { Link } from 'react-router-dom'
import AuthModal from './AuthModal'
import { FiLogIn } from 'react-icons/fi'
import { useAuth } from './AuthContext.jsx'
import FallbackAvatar from '../assets/avatar.png'

const Header = () => {
  const [authOpen, setAuthOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()

  return (
    <div className='container'>
        <div className="logo">
            <Link to="/">
              <img src={Logo} alt="логотип" />
            </Link>
            <p className="logo">СЕВЕРЯНОЧКА</p>
        </div>
        <a href="#" className="catalog">
        <RxHamburgerMenu />
        <p>Каталог</p>
        </a>
    
        <form className="search">
        <input type="text" 
        placeholder='Найти товар'
        className='search-input'
        />
        <IoIosSearch size={20}/>
        </form>
       <div className="menu">
       <a href="#" className='private'>
        <CiHeart size={40}/>
        <p>Избранное</p>
        </a>
        <a href="#">
        <BsBox2 size={35}/>
        <p>Заказы</p>
        </a>
        <Link to='/basket'>
            <SlBasket size={40}/>
            <p>Корзина</p>
        </Link>
       </div>
        {isAuthenticated && user ? (
          <div className="profile" style={{ display:'flex', alignItems:'center', gap:8 }}>
            <img src={user.avatar || FallbackAvatar} alt="user_avatar" style={{ width:32, height:32, borderRadius:'50%', objectFit:'cover' }} />
            <p>{user.name || user.login || 'Профиль'}</p>
          </div>
        ) : (
          <button onClick={() => setAuthOpen(true)} className="profile" style={{ background:'#70C05B', color:'#FFF', border:'none', padding:'8px 12px', display:'flex', alignItems:'center', gap:8, borderRadius:4 }}>
            <FiLogIn size={20} />
            <span>Войти</span>
          </button>
        )}
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

export default Header;