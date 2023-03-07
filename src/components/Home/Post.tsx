import React, { useState, useRef } from 'react'
import { BsThreeDots } from "react-icons/bs"
import { FaHeart, FaComment, } from 'react-icons/fa';
import { BsDot } from "react-icons/bs"
import PostButtons from './PostButtons';
import CommentsSection from './CommentsSection';
import { LikePostUrl } from '../../globles/globles';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../context/context';
import NewComment from './NewComment';
import Options from './Options';
import { deletePostUrl, savePostUrl } from '../../globles/globles';
import { BsFillPlusCircleFill } from "react-icons/bs"
import { TiTick } from "react-icons/ti"
import { toast } from 'react-toastify';

export type ofComment = {
    username: string
    userimage: string
    userId: string
    commentBody: string
}

type ofPost = {
    creatorname: string,
    creatorimage: string,
    postImage: string,
    likes: string[],
    createdOn: string,
    caption: string,
    postId: string,
    creatorId: string,
    comments: ofComment[]
}
const Post = ({ creatorname, creatorimage, likes, createdOn, caption, postImage, postId, creatorId }: ofPost) => {
    let d1 = new Date(createdOn)
    const [like, setLike] = useState(0)
    const [showComments, setShowComments] = useState(false)
    const [reload, setReload] = useState(0)
    const [disable, setDisable] = useState(false)
    const [options, setOptions] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [savedPost, setSavedPost] = useState(false)
    const [focusCount, setFocusCount] = useState(0)
    const { userData: { _id, userimage, username, saved }, renewUserData } = useContext(UserContext)
    const LikePost = async () => {
        return await axios.post(LikePostUrl, { userId: _id, postId }).then(res => {
            console.log(res)
            if (res.status == 200) {
                setLike(prev => prev + 1)
                setDisable(true)
                toast.success("successful")
            }
        }).catch(err => console.log(err))
    }
    const deletePost = async () => {
        const Url = deletePostUrl + "/" + _id + "/" + postId
        console.log(Url)
        await axios.delete(Url).then(res => {
            if (res.status == 200) {
                toast.success("successful")
                return window.location.reload()
            }
        }).catch(err => {
            throw (err)
        })
    }
    const saveThePost = async () => {
        setProcessing(true)
        await axios.post(savePostUrl, { userId: _id, postId: postId }).then(res => {
            if (res.status == 200) {
                setSavedPost(true)
                setProcessing(false)
                renewUserData()
                toast.success("successful")
            }
        }).catch(err => {
            setProcessing(false)
            console.log(err)
        })
    }
    return (
        <>
            <main className='p-2 max-w-[600px] flex flex-col gap-[1rem] bg-transparent backdrop-blur-[1px] rounded-lg border border-pickedColor'>
                <section>
                    <div className='flex justify-between items-center text-white'>
                        <div className='flex items-center gap-2'>
                            <img src={creatorimage} alt="userImage" className='h-8 w-8 rounded-full' />
                            <p>{creatorname}</p>
                            <BsDot />
                            <span className='text-gray-500 flex gap-[2px]'><span className='sm:block hidden'>Posted on</span> {d1.toString().slice(0, 15)}</span>
                        </div>
                        <span className={`relative ${_id === creatorId ? "" : "hidden"}`}>
                            <BsThreeDots className='hover:text-gray-400 cursor-pointer' onClick={() => setOptions(prev => !prev)} />
                            {options && <Options deletePost={deletePost} />}
                        </span>
                    </div>
                </section>
                <section>
                    <img src={postImage} alt="postImage" className='rounded-lg mb-2 w-[100%] sm:w-[580px] min-h-[400px]' />
                    <span className='text-white'>{likes.length + like} likes</span>
                    <p className='text-white'>{caption}
                    </p>
                </section>
                <section className='flex gap-3'>
                    <PostButtons title='Like' icon={FaHeart} btnFunction={LikePost} disable={likes.includes(_id) || disable} />
                    <PostButtons title='Comment' icon={FaComment} btnFunction={() => setFocusCount(prev => prev + 1)} />
                    <PostButtons
                        title={`${saved.includes(postId) || savedPost ? "Saved" : "Save"}`}
                        icon={saved.includes(postId) || savedPost ? TiTick : BsFillPlusCircleFill}
                        disable={processing || saved.includes(postId) || savedPost}
                        btnFunction={() => saveThePost()}
                    />
                </section>
                <section>
                    <span className='text-slate-500 underline cursor-pointer' onClick={() => setShowComments(true)}>View all of the other comments</span>
                </section>
                {focusCount > 0 && <NewComment userId={_id} userimage={userimage} username={username} postId={postId} reloadComments={() => setReload(prev => prev + 1)} focusCount={focusCount} />}
                <CommentsSection postId={postId} showComments={showComments} reload={reload} />
            </main>
        </>
    )
}

export default Post
