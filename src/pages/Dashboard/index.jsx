import { AuthContext } from '../../contextsAuth'
import { useContext } from 'react'

export function Dashboard() {
  const { logout } = useContext(AuthContext)

  async function handleLogout() {
    await logout();
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Sair da conta</button>
    </div>
  )
}