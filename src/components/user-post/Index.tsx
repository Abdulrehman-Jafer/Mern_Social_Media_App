import { useState } from 'react'
import Navigator from '../navigator/Navigator'
import { BsGrid3X3Gap } from "react-icons/bs"
import { MdReceipt } from "react-icons/md"
import AllPosts from './AllPosts'
import SavedPosts from '../saved-posts/SavedPosts'

const UserPosts = () => {
    const [active, setActive] = useState([true, false])

    return (
        <main className='border-t-2 p-2 w-full mediavw'>
            <section className='flex justify-center gap-4'>
                <div onClick={() => setActive([true, false])}>
                    <Navigator title='POSTS' icon={BsGrid3X3Gap} active={active[0]} />
                </div>
                <div onClick={() => setActive([false, true])}>
                    <Navigator title='SAVED' icon={MdReceipt} active={active[1]} />
                </div>
            </section>
            {active[0] ? <AllPosts /> : <SavedPosts />}
        </main>
    )
}

export default UserPosts
