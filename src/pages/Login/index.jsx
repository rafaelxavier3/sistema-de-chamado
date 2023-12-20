import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contextsAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

import './login.scss'
import logo from '../../assets/greenlogo.png'

const schema = yup.object({
  email: yup.string().required('Email obrigatório'),
  password: yup
    .string()
    .required('A senha é obrigatória')
})

export function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, loadingAuth } = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  async function handleLogin() {
    await login(email, password);
  }

  return (
    <div className='container'>
      <div className="login">
        <div className="login-img">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder='email@email.com'
            {...register('email')}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <p>{errors.email?.message}</p>
          <input
            type="password"
            placeholder='*******'
            {...register('password')}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p>{errors.password?.message}</p>

          <button type='submit'>
            {loadingAuth ? 'Entrando...' : 'Acessar'}
          </button>
        </form>

        <Link to="/register">Criar conta</Link>


      </div>
    </div>
  )
}