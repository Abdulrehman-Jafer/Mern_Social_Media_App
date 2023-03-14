import { useState, useRef,useEffect } from 'react'
import { IoIosSettings } from "react-icons/io"
import Settings from '../settings.tsx/Settings'
import useContextData from '../../hooks/useContextData'
import useClickOutside from '../../hooks/useClickOutside'
const ProfileTop = () => {
    const [display, setDisplay] = useState(false)
    const { userData:{username,userimage,posts}, LogOut } = useContextData()
    const handleCancel = () => {
        setDisplay(false)
    }

    const spanRef = useRef<HTMLSpanElement>(null);
    useClickOutside(spanRef,()=>setDisplay(false))

 
    return (
        <main>
            <main className='flex gap-7 justify-center items-center p-4 mb-[5rem] mediaFlexCol text-white'>
                <section>
                    <img src={userimage} alt={userimage} className="sm:h-[100px] sm:w-[100px] h-[80px] w-[80px] rounded-full border-4 border-second" />
                </section>
                <section className='flex flex-col gap-5'>
                    <div className='flex gap-4 items-center justify-center'>
                        <span>{username}</span>
                        <div className='flex items-center gap-2 relative'>
                            <button className='bg-slate-200 px-2 flex gap-1 rounded-sm text-black hover:bg-white'><span className='mediaHidden text-black'>Edit</span>Profile</button>
                            <span ref={spanRef}>
                                <IoIosSettings className='text-2xl cursor-pointer' onClick={() => setDisplay(prev => !prev)} />
                                <Settings display={display} LogOut={LogOut} cancel={handleCancel} />
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <span><b>{posts.length}</b> posts</span>
                        <span><b>78</b> followers</span>
                        <span><b>198</b> following</span>
                    </div>
                </section>
            </main>
        </main>
    )
}

export default ProfileTop
