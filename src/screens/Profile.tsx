import Sidebar from '../components/side-nav/SideNav'
import UserProfile from '../components/user-profile/Index'
import UserPosts from '../components/user-post/Index'
import TopNav from '../components/topNav/TopNav'
const ProfileScreen = () => {
    return (
        <main className='flex mediaFlexCol'>
            <Sidebar />
            <TopNav />
            <section className='flex flex-col max-w-[1000px] mx-auto mediaMargin'>
                <UserProfile />
                <UserPosts />
            </section>
        </main>
    )
}

export default ProfileScreen
