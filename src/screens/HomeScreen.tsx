import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import TopNav from '../components/Sidebar/TopNav'
import Posts from '../components/Posts/Index'
const HomeScreen = () => {
    return (
        <main className='flex h-[100%] w-[100%] mediaFlexCol'>
            <Sidebar fixed={true}/>
            <TopNav />
            <section className='flex flex-col w-[100%] ml-[10rem] mediaMargin justify-center items-center gap-3 mx-auto'>
                <Posts/>
            </section>
        </main>
    )
}

export default HomeScreen
