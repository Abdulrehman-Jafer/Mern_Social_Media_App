import { FiHome } from "react-icons/fi"
import { BsSearch, BsPlusSquare } from 'react-icons/bs'
import userImage from "../../assets/userImage.jpg"
import SideBarItems from '../Navigator/Navigator';
import Search from '../Search/Search';
import { useState } from "react"
import CreateNewPost from '../CreatePost/CreateNewPost';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
const TopNav = () => {
  const [searchDisplay, setSearchDisplay] = useState(false)
  const [createPostDisplay, setCreatePostDisplay] = useState(false)

  const SearchDisplayHandler = () => {
    setSearchDisplay(prev => prev ? false : true)
  }
  const createPostDisplayHandler = () => {
    setCreatePostDisplay(prev => !prev)
  }
  useEffect(()=>{
    if(createPostDisplay){
      document.body.style.overflow = "hidden"
    }
    else{
      document.body.style.overflow = "auto"
    }
  },[createPostDisplay])
  return (
    <>
      <main className='mediaBlock justify-between p-2 items-center bg-black text-white w-[100%] hidden border-b fixed z-[20]'>
        <section className='flex justify-between gap-2'>
          <Link to={"/"}>
            <SideBarItems title='Home' icon={FiHome} />
          </Link>
          <SideBarItems title='Search' icon={BsSearch} clickHandler={SearchDisplayHandler} />
          <SideBarItems title='Create' icon={BsPlusSquare} clickHandler={createPostDisplayHandler} />
          <Link to={"/profile"}>
            <SideBarItems title='Profile' img={userImage} />
          </Link>
        </section>
      </main>
      <Search displayValue={searchDisplay} goBack={SearchDisplayHandler} />
      <CreateNewPost createPostDisplay={createPostDisplay} handleCreatePostDisplay={createPostDisplayHandler} />
    </>
  )
}

export default TopNav
