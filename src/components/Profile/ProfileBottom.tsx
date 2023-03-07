import React, { useState } from 'react'
import SideBarItems from '../Sidebar/SideBarItems'
import { BsGrid3X3Gap } from "react-icons/bs"
import { MdReceipt } from "react-icons/md"
import UserPosts from './UserPosts'
import SavedPosts from './SavedPosts'

const ProfileBottom = () => {
    const [active, setActive] = useState([true, false])

    return (
        <main className='border-t-2 p-2 w-full'>
            <section className='flex justify-center gap-4'>
                <div onClick={() => setActive([true, false])}>
                    <SideBarItems title='POSTS' icon={BsGrid3X3Gap} active={active[0]} />
                </div>
                <div onClick={() => setActive([false, true])}>
                    <SideBarItems title='SAVED' icon={MdReceipt} active={active[1]} />
                </div>
            </section>
            {active[0] ? <UserPosts /> : <SavedPosts/>}
        </main>
    )
}

export default ProfileBottom
