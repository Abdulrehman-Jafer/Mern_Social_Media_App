import React, { useState } from 'react'
import Post from './Post'
import { getUserPostUrl } from '../../constants/constants'
import axios from "axios"
import { useContext, useEffect } from 'react'
import { OfPost } from '../../types'
import Loader from '../loader/Loader'
import useContextData from '../../hooks/useContextData'

const AllPosts = () => {
    const { userData: { _id } } = useContextData()
    const [userPosts, setUserPosts] = useState<OfPost[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getUserPosts = async () => {
            setLoading(true)
            await axios.post(getUserPostUrl, { userId: _id }).then(res => {
                setLoading(false)
                setUserPosts(res.data.userPosts)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
        }
        getUserPosts()
    }, [])

    const UserPostMap = userPosts.length ?
        userPosts.map(({ _id, comments, likes, image }) => <Post key={_id} id={_id} postImage={image} comments={comments} likes={likes} />)
        :
        <h1 className='text-white'>You dont have any Posts yet</h1>
    return (
        <main className='flex gap-[2rem] flex-wrap mt-[2rem] justify-center'>
            {loading ? <Loader /> : UserPostMap}
        </main>
    )
}

export default AllPosts
