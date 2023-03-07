import React from 'react';
import { FiHome } from "react-icons/fi"
import { BsSearch, BsPlusSquare } from 'react-icons/bs'
import userImage from "../../assets/userImage.jpg"
import SideBarItems from './SideBarItems';
import Search from '../Search/Search';
import { useState } from "react"
import CreateNewPost from '../Create/CreateNewPost';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Sidebar = ({fixed}:{fixed?:boolean}) => {
  const [searchDisplay, setSearchDisplay] = useState(false)
  const [createPostDisplay, setCreatePostDisplay] = useState(false)
  const SearchDisplayHandler = () => {
    setSearchDisplay(prev => prev ? false : true)
  }
  const createPostDisplayHandler = () => {
    window.scrollTo(0,0)
    setCreatePostDisplay(prev => {
      if (!prev) {
        document.body.style.overflow = "hidden"
        return true
      }
      else {
        document.body.style.overflow = "auto"
        return false
      }
    })
  }
  const {pathname} =useLocation()
  return (
    <>
      <main className={`flex flex-col gap-10 p-4 text-white border-r-2 w-[20%] border-gray-500 min-h-[100vh] ${fixed ? "fixed" : ""} mediaHidden`}>
        <h2 className='text-3xl specificFont bg-transparent backdrop-blur-lg text-center'>Spieser</h2>
        <section className='flex flex-col gap-6'>
          <Link to={"/"}>
            <SideBarItems title='Home' icon={FiHome} active={pathname == "/" ? true : false}/>
          </Link>
          <SideBarItems title='Search' icon={BsSearch} clickHandler={SearchDisplayHandler}/>
          <SideBarItems title='Create' icon={BsPlusSquare} clickHandler={createPostDisplayHandler} />
          <Link to={"/profile"}>
            <SideBarItems title='Profile' img={userImage}  active={pathname == "/profile" ? true : false}/>
          </Link>
        </section>
      </main>
      <Search displayValue={searchDisplay} goBack={SearchDisplayHandler} />
      <CreateNewPost createPostDisplay={createPostDisplay} handleCreatePostDisplay={createPostDisplayHandler} />
    </>
  )
}

export default Sidebar
