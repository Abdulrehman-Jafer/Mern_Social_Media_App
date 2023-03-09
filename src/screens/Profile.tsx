import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import UserProfile from '../components/UserProfile/Index'
import UserPosts from '../components/UserPost/Index'
import TopNav from '../components/Navbar/Navbar'
const ProfileScreen = () => {
    return (
        <main className='flex mediaFlexCol'>
            <Sidebar />
            <TopNav/>
            <section className='flex flex-col max-w-[1000px] mx-auto mediaMargin'>
                <UserProfile/>
                <UserPosts/>
            </section>
        </main>
    )
}

export default ProfileScreen
