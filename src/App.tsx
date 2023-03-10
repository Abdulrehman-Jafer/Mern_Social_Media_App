import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './screens/Home'
import Profile from './screens/Profile'
import SignUp from './screens/SignUp'
import { useEffect } from 'react'
import Login from './screens/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useContextData from './hooks/useContextData'
import NavigationRoutes from './components/navigation_routes/NavigationRoutes'


const App = () => {
 
  return (
      <main className='w-[100%] min-h-[100vh] nightSky'>
        <NavigationRoutes />
        <ToastContainer />
      </main>

  )
}

export default App
