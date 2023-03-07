import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import ProfileTop from '../components/Profile/ProfileTop'
import ProfileBottom from '../components/Profile/ProfileBottom'
import TopNav from '../components/Sidebar/TopNav'
const ProfileScreen = () => {
    return (
        <main className='flex mediaFlexCol'>
            <Sidebar />
            <TopNav/>
            <section className='flex flex-col max-w-[1000px] mx-auto mediaMargin'>
                <ProfileTop/>
                <ProfileBottom/>
            </section>
        </main>
    )
}

export default ProfileScreen
