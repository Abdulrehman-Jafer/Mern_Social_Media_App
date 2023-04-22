import { useState } from 'react'
import axios from "axios"
import { getAllPostUrl } from '../../constants/constants'
import { useEffect } from 'react'
import Post from './Post'
import { OfPost } from '../../types'
import Loader from '../loader/Loader'
import { toast } from 'react-toastify'
import useContextData from '../../hooks/useContextData'

const Posts = () => {
    const [posts, setPosts] = useState<OfPost[]>([])
    const [processing, setProcessing] = useState(false)
    const { reloadPosts } = useContextData()
    useEffect(() => {
        const getAllPosts = async () => {
            setProcessing(true)
            await axios.get(getAllPostUrl).then(res => {
                if (res.status == 200) {
                    setProcessing(false)
                    setPosts(res.data.Posts)
                    console.log(res)
                }
            }).catch(err => {
                setProcessing(false)
                toast.error("Sorry something went wrong")
                console.log(err)
            })
        }
        getAllPosts()
    }, [reloadPosts])
    const AllPosts = posts.map(({ _id, caption, comments, createdBy, createdOn, image, likes }) => (
        <Post
            key={_id}
            creatorId={createdBy.userId}
            postId={_id}
            caption={caption}
            createdOn={createdOn}
            likes={likes}
            comments={comments}
            creatorname={createdBy.username}
            creatorimage={createdBy.userimage}
            postImage={image} />
    ))
    return (
        <main className='flex flex-col-reverse items-center gap-3 mx-auto mt-[2rem]'>
            {processing ? <Loader /> : AllPosts}
        </main>
    )
}

export default Posts
