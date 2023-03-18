import { useEffect } from 'react'
import { Route, useNavigate, Routes } from 'react-router-dom'
import Profile from '../../screens/Profile'
import SignUp from '../../screens/SignUp'
import Home from "../../screens/Home"
import Login from '../../screens/Login'
import useContextData from '../../hooks/useContextData'
import Unauthorized from '../../screens/Unauthorized'


const NavigationRoutes = () => {
    const { userData: { _id } } = useContextData()
    const navigate = useNavigate()
    useEffect(() => {
        if (!_id) {
            navigate("/login")
            return
        }
        return
    }, [])

    return (
        <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={_id ? <Home /> : <Unauthorized />} />
            <Route path='/profile' element={_id ? <Profile /> : <Unauthorized />} />
        </Routes>
    )
}

export default NavigationRoutes
