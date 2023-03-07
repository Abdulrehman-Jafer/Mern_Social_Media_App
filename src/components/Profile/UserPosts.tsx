import React, { useState } from 'react'
import ProfilePost from './ProfilePost'
import { getUserPostUrl } from '../../globles/globles'
import axios from "axios"
import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/context'
import { OfPost } from '../../types.'
import Loader from '../../globles/Loader'

const UserPosts = () => {
    const { userData } = useContext(UserContext)
    const [userPosts, setUserPosts] = useState<OfPost[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getUserPosts = async () => {
            setLoading(true)
            await axios.post(getUserPostUrl, { userId: userData._id }).then(res => {
                setLoading(false)
                console.log(res)
                return setUserPosts(res.data.userPosts)
            }).catch(err => {
                console.log(err)
                return setLoading(false)
            })
        }
        getUserPosts()
    }, [])

    const UserPostMap = userPosts.length ? userPosts.map(({ _id, comments, likes, image }) => <ProfilePost key={_id} id={_id} postImage={image} comments={comments} likes={likes} />) : <h1 className='text-white'>You dont have any Posts yet</h1>
    return (
        <main className='flex gap-[2rem] flex-wrap mt-[2rem] justify-center'>
            {loading ? <Loader/> : UserPostMap}
        </main>
    )
}

export default UserPosts
