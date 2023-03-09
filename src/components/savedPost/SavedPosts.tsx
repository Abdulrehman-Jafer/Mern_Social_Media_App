import { useState, useEffect } from 'react'
import axios from 'axios'
import { getSavedPostUrl } from '../../constants/constants'
import { OfPost } from '../../types'
import Post from '../UserPost/Post'
import Loader from '../loader/Loader'
import { toast } from "react-toastify"
import useContextData from '../../hooks/useContextData'

const SavedPosts = () => {
    const { userData: { _id } } = useContextData()
    const [savedPosts, setSavedPosts] = useState<OfPost[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getSavedPosts = async () => {
            setLoading(true)
            let Url = getSavedPostUrl + "/" + _id
            await axios.get(Url).then(res => {
                if (res.status == 200) {
                    const data = res.data.savedPost.filter((value: OfPost) => value !== null)
                    setLoading(false)
                    setSavedPosts(data)
                }
            }).catch(err => {
                setLoading(false)
                console.log(err)
                return toast.error("Something went wrong")
            })
        }
        getSavedPosts()
    }, [])
    const savedPostMap = savedPosts.length > 0 ?
        savedPosts.map(({ _id, comments, likes, image }) => <Post key={_id} id={_id} postImage={image} comments={comments} likes={likes} />) :
        <h1 className='text-white'>You dont have any Saved Posts</h1>
    return (
        <main className='flex gap-[2rem] flex-wrap mt-[2rem] justify-center'>
            {loading ? <Loader /> : savedPostMap}
        </main>
    )
}

export default SavedPosts
