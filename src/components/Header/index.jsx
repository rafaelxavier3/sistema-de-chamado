import { useContext } from 'react'
import avatarImg from "../../assets/avatar.png"
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contextsAuth'
import { CiHome, CiUser, CiSettings } from "react-icons/ci";

import './header.scss'


export function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto do usuario" />
      </div>

      <Link to="/dashboard">
        <CiHome color='#fff' size={24} />
        Chamados
      </Link>
      <Link to="/customers">
        <CiUser color='#fff' size={24} />
        Clientes
      </Link>
      <Link to="/profile">
        <CiSettings color='#fff' size={24} />
        Perfil
      </Link>
    </div>
  )
}