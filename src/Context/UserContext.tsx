import { createContext, Dispatch, FormEvent, ReactNode, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { SignUpUrl, LogInUrl, renewUserUrl } from "../constants/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ofUserData, ofSignUp, ofLogIn } from "../types";
import { toast } from 'react-toastify';
import { UndefinedUser } from "../utils/sessionStorage/undefinedUser";
import { ofProvider } from "./file.types";
import sessionStorageHandler from "../utils/sessionStorage/sessionStorage handler";


export const UserContext = createContext({} as ofProvider)
const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const { setsessionStorage, sessionUser } = sessionStorageHandler()
    const [reloadPosts, setReloadPosts] = useState(0)
    const [userData, setUserData] = useState<ofUserData>(sessionUser)
    const navigate = useNavigate()

    const SignUp = async (event: FormEvent, signUpData: ofSignUp, setSignUpData: Dispatch<SetStateAction<ofSignUp>>, setProcessing: Dispatch<SetStateAction<boolean>>) => {
        event.preventDefault()
        setProcessing(true)
        try {
            const response = await axios.post(SignUpUrl, signUpData)
            if (response.data.status == 201) {
                setProcessing(false)
                setSignUpData({ password: "", userimage: "", username: "", confirm: "" })
                toast.success("Successful")
                navigate("/login")
            }
        }
        catch (err) {
            setProcessing(false);
            err instanceof AxiosError ? toast.error(err.response?.data.message) : toast.error("Something went wrong!");
        }
    }

    const LogIn = async (event: FormEvent, LogInInfo: ofLogIn, setLogInnfo: Dispatch<SetStateAction<ofLogIn>>, setProcessing: Dispatch<SetStateAction<boolean>>) => {
        event.preventDefault()
        setProcessing(true)
        await axios.post(LogInUrl, LogInInfo).then((res) => {
            if (res.status == 200) {
                setProcessing(false)
                setUserData(res.data.existingUser)
                setsessionStorage(res.data.existingUser)
                setLogInnfo({ username: "", password: "" })
                toast.success("Successful")
                navigate("/")
            }
        }).catch(err => {
            setProcessing(false)
            err instanceof AxiosError ? toast.error(err.response?.data.message) : toast.error("Something went wrong")
        })
    }

    const renewUserData = async () => {
        await axios.get(`${renewUserUrl}${userData._id}`).then((res) => {
            if (res.status == 200) {
                setUserData(res.data.existingUser)
                setsessionStorage(res.data.existingUser)
            }
        }).catch(err => toast.error(`Something went wrong ${err.message}`))
    }

    const LogOut = () => {
        setUserData(UndefinedUser)
        setsessionStorage(UndefinedUser)
        toast.success("Successful")
        navigate("/login")
    }

    const renewPosts = () => {
        setReloadPosts(prev => prev + 1)
    }

    return (
        <UserContext.Provider value={
            {
                userData,
                SignUp,
                LogIn,
                LogOut,
                renewUserData,
                reloadPosts,
                renewPosts
            }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider