import React from 'react'
import Logo from '../assets/logo.svg'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { SlBasket } from "react-icons/sl";
import Avatar from "../assets/avatar.png"
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom'

const Header = () => {
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
        <a href="#" className="profile">
            <div className="user-profile">
                <div className="profile-info">
                <img src={Avatar} alt="user_avatar" />
                <p>Алексей</p>
                </div>
                <IoIosArrowDown />
            </div>
        </a>
    </div>
  );
};

export default Header;