import { ofUserData,ofLogIn,ofSignUp } from "../types"
import {FormEvent,Dispatch,SetStateAction} from "react"
export type ofProvider = {
    userData: ofUserData,
    SignUp: (event: React.FormEvent, signUpData: ofSignUp, setSignUpData: React.Dispatch<React.SetStateAction<ofSignUp>>) => void
    processing: boolean,
    LogIn: (event: FormEvent, LogInInfo: ofLogIn, setLogInnfo: Dispatch<SetStateAction<ofLogIn>>) => void,
    LogOut: () => void,
    renewUserData: () => void
}