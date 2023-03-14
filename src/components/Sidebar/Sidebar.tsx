import { useState, useEffect } from "react"
import { FiHome } from "react-icons/fi"
import { BsSearch, BsPlusSquare } from 'react-icons/bs'
import userImage from "../../assets/userImage.jpg"
import Navigator from "../Navigator/Navigator"
import Search from '../Search/Search';
import CreateNewPost from '../CreatePost/CreateNewPost';
import { Link, useLocation } from 'react-router-dom';
const Sidebar = ({ fixed }: { fixed?: boolean }) => {
  const [searchDisplay, setSearchDisplay] = useState(false)
  const [createPostDisplay, setCreatePostDisplay] = useState(false)

  const showSearch = () => {
    setSearchDisplay(true)
  }
  const hideSearch = () => {
    setSearchDisplay(false)
  }

  const showCreatePost = () => {
    setCreatePostDisplay(true)
  }
  const hideCreatePost = () => {
    setCreatePostDisplay(false)
  }

  useEffect(() => {
    if (createPostDisplay) {
      document.body.style.overflow = "hidden"
    }
    else {
      document.body.style.overflow = "auto"
    }
  }, [createPostDisplay])
  const { pathname } = useLocation()
  return (
    <>
      <main className={`flex flex-col gap-10 p-4 text-white border-r-2 w-[20%] border-gray-500 min-h-[100vh] ${fixed ? "fixed" : ""} mediaHidden`}>
        <h2 className='text-3xl specificFont bg-transparent backdrop-blur-lg text-center'>Spieser</h2>
        <section className='flex flex-col gap-6'>
          <Link to={"/"}>
            <Navigator title='Home' icon={FiHome} active={pathname == "/" ? true : false} />
          </Link>
          <Navigator title='Search' icon={BsSearch} clickHandler={showSearch} />
          <Navigator title='Create' icon={BsPlusSquare} clickHandler={showCreatePost} />
          <Link to={"/profile"}>
            <Navigator title='Profile' img={userImage} active={pathname == "/profile" ? true : false} />
          </Link>
        </section>
      </main>
      <Search displayValue={searchDisplay} hideSearch={hideSearch}/>
      <CreateNewPost createPostDisplay={createPostDisplay} hideCreatePost={hideCreatePost} />
    </>
  )
}

export default Sidebar
