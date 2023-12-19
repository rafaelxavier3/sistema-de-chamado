import { useState } from 'react'

import logo from '../../assets/greenlogo.png'
import { Link } from 'react-router-dom'

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (
    <div className='container'>
      <div className="login">
        <div className="login-img">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <form>
          <h1>Registrar-se</h1>
          <input
            type="text"
            placeholder='nome completo'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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

          <button type='submit'>Registrar</button>
        </form>

        <Link to="/">Já possuo uma conta</Link>
      </div>
    </div>
  )
}