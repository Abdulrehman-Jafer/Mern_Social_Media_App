import { createContext, Dispatch, FormEvent, ReactNode, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { SignUpUrl, LogInUrl,renewUserUrl } from "../constants/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ofUserData, ofSignUp, ofLogIn } from "../types";
import { toast } from 'react-toastify';
import { UndefinedUser } from "../utils/localsotrage/undefinedUser";
import { ofProvider } from "./file.types";
import LocalStorageHandler from "../utils/localsotrage/localsorage handler";


export const UserContext = createContext({} as ofProvider)
const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const { setLocalStorage, localUser } = LocalStorageHandler()
    const [reloadPosts,setReloadPosts] = useState(0)
    const [userData, setUserData] = useState<ofUserData>(localUser)
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
            if(err instanceof AxiosError){
                    toast.error(err.response?.data.message);
            }
            else{
                toast.error("Something went wrong!");
            }
        }
    }
        const LogIn = async (event: FormEvent, LogInInfo: ofLogIn, setLogInnfo: Dispatch<SetStateAction<ofLogIn>>, setProcessing: Dispatch<SetStateAction<boolean>>) => {
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
                setProcessing(false)
                if(err instanceof AxiosError){
                    toast.error(err.response?.data.message)
                }
                else{
                    toast.error("Something went wrong")
                    console.log(err)
                }
            })
        }
        const renewUserData = async () => {
            const Url = 
            await axios.get(`${renewUserUrl}${userData._id}`).then((res) => {
                if (res.status == 200) {
                    setUserData(res.data.existingUser)
                    setLocalStorage(res.data.existingUser)
                }
            }).catch(err => {
                toast.error("Something went wrong")
                console.log(err)
            })
        }
        const LogOut = () => {
            setUserData(UndefinedUser)
            setLocalStorage(UndefinedUser)
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