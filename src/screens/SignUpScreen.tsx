import React, {useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { fileOnChangeHandler } from '../globles/globles'
import InputFields from '../components/Input/InputFields'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ImUser } from "react-icons/im"
import { BiLockAlt } from "react-icons/bi"

const SignUpScreen = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password: "",
        confirm:"",
        userimage: ""
    })
    const imageRef = useRef<HTMLInputElement>(null)
    const [imageProcessing, setImageProcessing] = useState(false)
    const { SignUp, processing } = useContext(UserContext)
    const imageInput = signUpData.userimage == "" ?
        <div className='relative mx-auto mb-[1rem]'>
            <span className='border text-white p-2 rounded-[0.3rem] cursor-pointer hover:border-2 transition-all' onClick={()=>imageRef.current?.click()}>Choose a profile pic</span>
            <input ref={imageRef} type="file" className='hidden' accept='image/*' value={signUpData.userimage} onChange={(event) => fileOnChangeHandler(event, setSignUpData, setImageProcessing)} required />
        </div>
        :
        <img src={signUpData.userimage} alt={signUpData.userimage} className="w-[100%] object-contain max-h-[10rem]" />
    return (

        <main className='w-[100%] h-[100vh] backgroundImage flex justify-center items-center'>
            <section className='border rounded-md p-2 min-h-[20rem] w-[20rem] sm:w-[30rem] sm:min-h-[30rem] flex flex-col backdrop-blur-lg'>
                <h1 className='text-white text-4xl font-semibold text-center mb-[3rem] mt-2'>Sign up</h1>
                    {signUpData.password !== signUpData.confirm && <p className='text-center text-red-500'>Password does not match</p>}
                <form className='flex flex-col gap-3 my-[1rem]' onSubmit={(event) => SignUp(event, signUpData, setSignUpData)} >
                    <InputFields label='Username' inputName='username' inputValue={signUpData.username} setInputValue={setSignUpData} icon={ImUser}/>
                    <InputFields type='password' label='Password' inputName='password' inputValue={signUpData.password} setInputValue={setSignUpData} icon={BiLockAlt}/>
                    <InputFields type='password' label='Confirm Password' inputName='confirm' inputValue={signUpData.confirm} setInputValue={setSignUpData} icon={BiLockAlt}/>
                    {imageProcessing ? "uploading your Image...." : imageInput}
                    <button
                        disabled={processing || signUpData.password !== signUpData.confirm || !signUpData.password || !signUpData.userimage}
                        className='bg-slate-300 text-black disabled:bg-slate-300 rounded-[2rem] p-3 font-semibold hover:bg-slate-200 text-[1.2rem]'>
                        {processing ? "Please wait" : "Sign Up"}
                    </button>
                </form>
                <div className='flex flex-wrap justify-center'>
                    <span className='text-white'>Already have an account?</span><Link to={"/login"} className='text-white font-semibold underline'>Log in</Link>
                </div>
            </section>
        </main>
    )
}

export default SignUpScreen
