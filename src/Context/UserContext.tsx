import  { createContext, Dispatch, FormEvent, ReactNode, SetStateAction } from "react";
import axios from "axios";
import { SignUpUrl, LogInUrl } from "../constants/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ofUserData,ofSignUp,ofLogIn } from "../types";
import { toast } from 'react-toastify';
import { UndefinedUser } from "../utils/localsotrage/undefinedUser";
import { ofProvider } from "./file.types";
import LocalStorageHandler from "../utils/localsotrage/localsorage handler";


export const UserContext = createContext({} as ofProvider)
const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [processing, setProcessing] = useState(false)
    const {setLocalStorage,localUser} = LocalStorageHandler()
    const [userData, setUserData] = useState<ofUserData>(localUser)
    const navigate = useNavigate()

    const SignUp = async (event:FormEvent, signUpData: ofSignUp, setSignUpData: Dispatch<SetStateAction<ofSignUp>>) => {
        event.preventDefault()
        setProcessing(true)
        await axios.post(SignUpUrl, signUpData)
            .then(res => {
                if (res.status == 201) {
                    setProcessing(false)
                    setSignUpData({ password: "", userimage: "", username: "", confirm: "" })
                    toast.success("Successful")
                    navigate("/login")
                }
            })
            .catch(err => {
                setProcessing(false)
                toast.error("Something went wrong")
                console.log(err)
            })
    }
    const LogIn = async (event: FormEvent, LogInInfo: ofLogIn, setLogInnfo: Dispatch<SetStateAction<ofLogIn>>) => {
        event.preventDefault()
        setProcessing(true)
        await axios.post(LogInUrl, LogInInfo).then((res) => {
            if (res.status == 200) {
                setProcessing(false)
                setUserData(res.data.existingUser)
                setLocalStorage(res.data.existingUser)
                setLogInnfo({ username: "", password: "" })
                toast.success("Successful")
                navigate("/")
            }
        }).catch(err => {
            toast.error("Something went wrong")
            setProcessing(false)
            console.log(err)
        })
    }
    const renewUserData = async () => {
        await axios.post(LogInUrl, { username: userData.username, password: userData.password }).then((res) => {
            if (res.status == 200) {
                setUserData(res.data.existingUser)
                setLocalStorage(res.data.existingUser)
            }
        }).catch(err => {
             console.log(err)
        })
    }
    const LogOut = () => {
        setUserData(UndefinedUser)
        setLocalStorage(UndefinedUser)
        toast.success("Successful")
        navigate("/login")
    }
    return (
        <UserContext.Provider value={
            {
                userData,
                SignUp,
                processing,
                LogIn,
                LogOut,
                renewUserData
            }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider