import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import SignUpScreen from './screens/SignUpScreen'
import { useEffect, useContext } from 'react'
import LoginScrren from './screens/LoginScrren'
import { UserContext } from './Context/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const { userData } = useContext(UserContext)
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
        <Route path='/signup' element={<SignUpScreen />} />
        <Route path='/login' element={<LoginScrren />} />
        <Route path='/' element={<HomeScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Routes>
     <ToastContainer/>
    </main>

  )
}

export default App
