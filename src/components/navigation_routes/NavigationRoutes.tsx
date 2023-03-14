import { useEffect } from 'react'
import { Route,useNavigate,Routes } from 'react-router-dom'
import Profile from '../../screens/Profile'
import SignUp from '../../screens/SignUp'
import Home from "../../screens/Home"
import Login from '../../screens/Login'
import useContextData from '../../hooks/useContextData'


const NavigationRoutes = () => {
    const { userData } = useContextData()
    const navigate = useNavigate()
    useEffect(() => {
        if (!userData._id) {
            return navigate("/login")
        }
        navigate("/")
    }, [])

    return (
        <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    )
}

export default NavigationRoutes
