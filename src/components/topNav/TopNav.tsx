import { FiHome } from "react-icons/fi"
import { BsSearch, BsPlusSquare } from 'react-icons/bs'
import userImage from "../../assets/userImage.jpg"
import Search from "../search/Search";
import Navigator from "../navigator/Navigator";
import { useState } from "react"
import CreateNewPost from '../create-a-post/CreateNewPost';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
const TopNav = () => {
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
  return (
    <>
      <main className='mediaBlock justify-between p-2 items-center bg-black text-white w-[100%] hidden border-b fixed z-[20]'>
        <section className='flex justify-between gap-2'>
          <Link to={"/"}>
            <Navigator title='Home' icon={FiHome} />
          </Link>
          <Navigator title='Search' icon={BsSearch} clickHandler={showSearch} />
          <Navigator title='Create' icon={BsPlusSquare} clickHandler={showCreatePost} />
          <Link to={"/profile"}>
            <Navigator title='Profile' img={userImage} />
          </Link>
        </section>
      </main>
      <Search displayValue={searchDisplay} hideSearch={hideSearch} />
      <CreateNewPost createPostDisplay={createPostDisplay} hideCreatePost={hideCreatePost} />
    </>
  )
}

export default TopNav
