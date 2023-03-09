import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './screens/Home'
import Profile from './screens/Profile'
import SignUp from './screens/SignUp'
import { useEffect } from 'react'
import Login from './screens/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useContextData from './hooks/useContextData'


const App = () => {
  const { userData } = useContextData()
  const navigate = useNavigate()
  useEffect(() => {
    if (!userData._id) {
      return navigate("/login")
    }
    navigate("/")
  }, [userData._id])
  return (
    <main className='w-[100%] min-h-[100vh] nightSky'>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <ToastContainer />
    </main>

  )
}

export default App
