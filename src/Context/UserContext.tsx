import React, { createContext, Dispatch, FormEvent, ReactNode, SetStateAction, useEffect } from "react";
import axios from "axios";
import { SignUpUrl, LogInUrl } from "../globles/globles";
import { ofSignUp, ofLogIn } from "../globles/globles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emptyUserData, ofUserData } from "../types";
import { toast } from 'react-toastify';

type ofProviderValue = {
    userData: ofUserData,
    SignUp: (event: React.FormEvent, signUpData: ofSignUp, setSignUpData: React.Dispatch<React.SetStateAction<ofSignUp>>) => void
    processing: boolean,
    LogIn: (event: FormEvent, LogInInfo: ofLogIn, setLogInnfo: Dispatch<SetStateAction<ofLogIn>>) => void,
    LogOut: () => void,
    renewUserData: () => void
}
export const UserContext = createContext({} as ofProviderValue)
const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [processing, setProcessing] = useState(false)
    const [userData, setUserData] = useState<ofUserData>(JSON.parse(window.localStorage.getItem("UserData")!) ? JSON.parse(window.localStorage.getItem("UserData")!) : emptyUserData)
    const navigate = useNavigate()

    const SignUp = async (event: React.FormEvent, signUpData: ofSignUp, setSignUpData: React.Dispatch<React.SetStateAction<ofSignUp>>) => {
        event.preventDefault()
        setProcessing(true)
        await axios.post(SignUpUrl, signUpData)
            .then(res => {
                if (res.status == 201) {
                    setProcessing(false)
                    setSignUpData({ password: "", userimage: "", username: "", confirm: "" })
                    toast.success("Successful")
                    return navigate("/login")
                }
            })
            .catch(err => {
                setProcessing(false)
                toast.error("something went wrong")
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
                window.localStorage.setItem("UserData", JSON.stringify(res.data.existingUser))
                console.log(res)
                setLogInnfo({ username: "", password: "" })
                toast.success("Successful")
                return navigate("/")
            }
        }).catch(err => {
            toast.error("something went wrong")
            setProcessing(false)
            console.log(err)
        })
    }
    const renewUserData = async () => {
        await axios.post(LogInUrl, { username: userData.username, password: userData.password }).then((res) => {
            if (res.status == 200) {
                setUserData(res.data.existingUser)
                console.log("updated user")
                return window.localStorage.setItem("UserData", JSON.stringify(res.data.existingUser))
            }
        }).catch(err => {
            return console.log(err)
        })
    }
    const LogOut = () => {
        setUserData(emptyUserData)
        window.localStorage.setItem("UserData", JSON.stringify(emptyUserData))
        toast.success("successful")
        return navigate("/login")
    }
    return (
        <UserContext.Provider value={
            {
                userData: userData,
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