import { useState } from 'react'
import { Link } from 'react-router-dom'

import './login.scss'
import logo from '../../assets/greenlogo.png'

export function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (
    <div className='container'>
      <div className="login">
        <div className="login-img">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <form>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder='email@email.com'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder='*******'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type='submit'>Acessar</button>
        </form>

        <Link to="/register">Criar conta</Link>


      </div>
    </div>
  )
}