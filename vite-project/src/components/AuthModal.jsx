import React, { useState } from 'react'
import { useAuth } from './AuthContext.jsx'

const TabButton = ({ active, onClick, children }) => (
  <button className={`auth-tab ${active ? 'active' : ''}`} onClick={onClick}>
    {children}
  </button>
)

const AuthModal = ({ open, onClose }) => {
  const [tab, setTab] = useState('login')
  const { login, register } = useAuth()

  // login form state (поддерживаем login ИЛИ email)
  const [loginLogin, setLoginLogin] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginName, setLoginName] = useState('')
  const [loginAvatar, setLoginAvatar] = useState('')

  // register form state (все поля из схемы)
  const [regLogin, setRegLogin] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regName, setRegName] = useState('')
  const [regAvatar, setRegAvatar] = useState('') // URL аватара
  const [regPassword, setRegPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      // Отправляем только допустимые для бэкенда поля (login/email + password)
      if (loginLogin.trim()) {
        await login({ login: loginLogin.trim(), password: loginPassword })
      } else {
        await login({ email: loginEmail.trim(), password: loginPassword })
      }
      onClose()
    } catch (err) {
      setError(err?.response?.data?.message || 'Не удалось войти. Проверьте данные.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await register({
        login: regLogin.trim(),
        email: regEmail.trim(),
        name: regName.trim(),
        avatar: regAvatar.trim() || undefined,
        password: regPassword,
      })
      onClose()
    } catch (err) {
      setError(err?.response?.data?.message || 'Не удалось зарегистрироваться. Попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-window' onClick={(e) => e.stopPropagation()}>
        <div className='auth-header'>
          <TabButton active={tab === 'login'} onClick={() => setTab('login')}>Вход</TabButton>
          <TabButton active={tab === 'register'} onClick={() => setTab('register')}>Регистрация</TabButton>
        </div>

        {error && <p style={{ color:'#FF6633', marginBottom: 8 }}>{error}</p>}

        {tab === 'login' ? (
          <form className='auth-form' onSubmit={handleLogin}>
            <input
              className='auth-input'
              type='text'
              placeholder='Логин (или оставьте пустым)'
              value={loginLogin}
              onChange={(e) => setLoginLogin(e.target.value)}
              disabled={isLoading}
            />
            <input
              className='auth-input'
              type='email'
              placeholder='Email (если нет логина)'
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              disabled={isLoading}
            />
            <input
              className='auth-input'
              type='password'
              placeholder='Пароль'
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              disabled={isLoading}
            />
            {/* Необязательные поля, чтобы совпадали с регистрацией (не отправляются на бэкенд при логине) */}
            <input
              className='auth-input'
              type='text'
              placeholder='Имя (необязательно)'
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              disabled={isLoading}
            />
            <input
              className='auth-input'
              type='url'
              placeholder='Avatar URL (необязательно)'
              value={loginAvatar}
              onChange={(e) => setLoginAvatar(e.target.value)}
              disabled={isLoading}
            />
            <button className='auth-submit' type='submit' disabled={isLoading || (!loginLogin && !loginEmail)}>
              {isLoading ? 'Входим…' : 'Войти'}
            </button>
          </form>
        ) : (
          <form className='auth-form' onSubmit={handleRegister}>
            <input
              className='auth-input'
              type='text'
              placeholder='Логин'
              required
              value={regLogin}
              onChange={(e) => setRegLogin(e.target.value)}
              disabled={isLoading}
            />
            <input
              className='auth-input'
              type='email'
              placeholder='Email'
              required
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              disabled={isLoading}
            />
            <input
              className='auth-input'
              type='text'
              placeholder='Имя'
              required
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              disabled={isLoading}
            />
            <input
              className='auth-input'
              type='url'
              placeholder='Avatar URL (необязательно)'
              value={regAvatar}
              onChange={(e) => setRegAvatar(e.target.value)}
              disabled={isLoading}
            />
            <input
              className='auth-input'
              type='password'
              placeholder='Пароль'
              required
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              disabled={isLoading}
            />
            <button className='auth-submit' type='submit' disabled={isLoading}>
              {isLoading ? 'Регистрируем…' : 'Зарегистрироваться'}
            </button>
          </form>
        )}

        <button className='modal-close' onClick={onClose}>✕</button>
      </div>
    </div>
  )
}

export default AuthModal
