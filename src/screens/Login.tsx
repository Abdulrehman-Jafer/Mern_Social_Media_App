import { useState } from 'react'
import { Link } from 'react-router-dom'
import InputFields from '../components/Input/InputFields'
import { ImUser } from "react-icons/im"
import { BiLockAlt } from "react-icons/bi"
import Loader from '../components/loader/Loader'
import useContextData from '../hooks/useContextData'

const LoginScrren = () => {
    const { LogIn } = useContextData()
    const [logInInfo, setLogInnfo] = useState({ username: "", password: "" })
    const [processing,setProcessing] = useState(false)
    return (
        <main className='w-[100%] h-[100vh] backgroundImage flex justify-center items-center'>
            <section className='border rounded-md p-2 min-h-[20rem] w-[20rem] sm:w-[30rem] sm:h-[30rem] flex flex-col backdrop-blur-lg'>
                <h1 className='text-white text-4xl font-semibold text-center mb-[3rem] mt-2'>Log in</h1>
                <form className='flex flex-col gap-3 my-[1rem]' onSubmit={(event) => LogIn(event, logInInfo, setLogInnfo,setProcessing)}>
                    <InputFields label='Username' inputName='username' inputValue={logInInfo.username} setInputValue={setLogInnfo} icon={ImUser} />
                    <InputFields type='password' label='Password' inputName='password' inputValue={logInInfo.password} setInputValue={setLogInnfo} icon={BiLockAlt} />
                    <button
                        disabled={processing}
                        className={`bg-slate-300 text-black disabled:bg-slate-300 rounded-[2rem] p-3 font-semibold hover:bg-slate-200 disabled:hover:bg-slate-300 text-[1.2rem]`}>
                        {processing ? <Loader/>  : <span>Log In</span>}
                    </button>
                </form>
                <div className='flex flex-wrap justify-center'>
                    <span className='text-white'>Don't have an account?</span><Link to={"/signup"}  className='text-white font-semibold underline'>Create an account</Link>
                </div>
            </section>
        </main>
    )
}

export default LoginScrren
