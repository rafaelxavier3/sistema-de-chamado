import { BrowserRouter } from "react-router-dom"
import { Router } from "./Routes/Router"
import { AuthProvider } from "./contextsAuth"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer autoClose={3000} />
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
