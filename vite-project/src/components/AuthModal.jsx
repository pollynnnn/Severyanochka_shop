import React, { useState } from 'react'

const TabButton = ({ active, onClick, children }) => (
  <button className={`auth-tab ${active ? 'active' : ''}`} onClick={onClick}>
    {children}
  </button>
)

const AuthModal = ({ open, onClose }) => {
  const [tab, setTab] = useState('login')

  if (!open) return null

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-window' onClick={(e) => e.stopPropagation()}>
        <div className='auth-header'>
          <TabButton active={tab === 'login'} onClick={() => setTab('login')}>Вход</TabButton>
          <TabButton active={tab === 'register'} onClick={() => setTab('register')}>Регистрация</TabButton>
        </div>

        {tab === 'login' ? (
          <form className='auth-form' onSubmit={(e) => e.preventDefault()}>
            <input className='auth-input' type='email' placeholder='Email' required />
            <input className='auth-input' type='password' placeholder='Пароль' required />
            <button className='auth-submit' type='submit'>Войти</button>
          </form>
        ) : (
          <form className='auth-form' onSubmit={(e) => e.preventDefault()}>
            <input className='auth-input' type='text' placeholder='Имя' required />
            <input className='auth-input' type='email' placeholder='Email' required />
            <input className='auth-input' type='password' placeholder='Пароль' required />
            <button className='auth-submit' type='submit'>Зарегистрироваться</button>
          </form>
        )}

        <button className='modal-close' onClick={onClose}>✕</button>
      </div>
    </div>
  )
}

export default AuthModal
