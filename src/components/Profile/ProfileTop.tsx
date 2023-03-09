import React, { useState, useContext, useRef,useEffect } from 'react'
import { IoIosSettings } from "react-icons/io"
import ProfileSettings from './ProfileSettings'
import { UserContext } from '../../Context/UserContext'
const ProfileTop = () => {
    const [display, setDisplay] = useState(false)
    const { userData:{_id,likedPost,username,userimage,posts}, LogOut } = useContext(UserContext)
    const handleCancel = () => {
        setDisplay(false)
    }

    const spanRef = useRef<HTMLSpanElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (!spanRef.current?.contains(event.target as Node)) {
            setDisplay(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <main>
            <main className='flex gap-7 justify-center items-center p-4 mb-[5rem] mediaFlexCol text-white'>
                <section>
                    <img src={userimage} alt={userimage} className="sm:h-[100px] sm:w-[100px] h-[80px] w-[80px] rounded-full" />
                </section>
                <section className='flex flex-col gap-5'>
                    <div className='flex gap-4 items-center justify-center'>
                        <span>{username}</span>
                        <div className='flex items-center gap-2 relative'>
                            <button className='bg-slate-200 p-1 px-3 flex gap-1 rounded-md text-black hover:bg-white'><span className='mediaHidden text-black'>Edit</span>Profile</button>
                            <span ref={spanRef}>
                                <IoIosSettings className='text-2xl cursor-pointer' onClick={() => setDisplay(prev => !prev)} />
                                <ProfileSettings display={display} LogOut={LogOut} cancel={handleCancel} />
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
