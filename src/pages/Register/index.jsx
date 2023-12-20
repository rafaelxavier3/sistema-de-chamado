import { useState, useContext } from 'react'
import logo from '../../assets/greenlogo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contextsAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required('Insira seu nome'),
  email: yup.string().required('Email obrigatório'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'A senha deve conter números e letras')
});

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { createRegister, loadingAuth } = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  async function handleCreateRegister() {
    await createRegister(name, email, password)
  }

  return (
    <div className='container'>
      <div className="login">
        <div className="login-img">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <form onSubmit={handleSubmit(handleCreateRegister)}>
          <h1>Registrar-se</h1>
          <input
            type="text"
            placeholder='nome completo'
            {...register('name')}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <p>{errors.name?.message}</p>
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
            {loadingAuth ? 'Carregando...' : 'Cadastrar'}
          </button>
        </form>

        <Link to="/">Já possuo uma conta</Link>
      </div>
    </div>
  )
}