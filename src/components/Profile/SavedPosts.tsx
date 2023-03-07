import React, { useState } from 'react'
import axios from 'axios'
import { getSavedPostUrl } from '../../globles/globles'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/context'
import { OfPost } from '../../types.'
import ProfilePost from './ProfilePost'
import Loader from '../../globles/Loader'

const SavedPosts = () => {
    const { userData: { _id } } = useContext(UserContext)
    const [savedPosts, setSavedPosts] = useState<OfPost[]>([])
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        const getSavedPosts = async () => {
            setLoading(true)
            let Url = getSavedPostUrl + "/" + _id
            await axios.get(Url).then(res => {
                if (res.status == 200) {
                    setLoading(false)
                    setSavedPosts(res.data.savedPost)
                }
            }).catch(err => {
                setLoading(false)
                console.log(err)
        })
        }
        getSavedPosts()
    }, [])
    const savedPostMap = savedPosts.length ?
        savedPosts.map(({ _id, comments, likes, image }) => <ProfilePost key={_id} id={_id} postImage={image} comments={comments} likes={likes} />) :
        <h1 className='text-white'>You dont have any Posts yet</h1>
    return (
        <main className='flex gap-[2rem] flex-wrap mt-[2rem] justify-center'>
            {loading ? <Loader/> : savedPostMap}
        </main>
    )
}

export default SavedPosts
