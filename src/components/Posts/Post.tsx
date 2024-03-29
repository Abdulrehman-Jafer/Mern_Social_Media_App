import { useState, useRef } from 'react'
import axios, { AxiosError } from 'axios';
import PostButton from './PostButton';
import Options from './Options';
import Timeago from '../time-ago/TimeAgo';
import PostComments from "../comments/Index"
import { ofPostProps } from './file.type';
import { deletePostUrl, savePostUrl, LikePostUrl } from '../../constants/constants';
import { TiTick } from "react-icons/ti"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { BsThreeDots } from "react-icons/bs"
import { FaHeart, FaComment, } from 'react-icons/fa';
import { BsDot } from "react-icons/bs"
import { toast } from 'react-toastify';
import Warning from '../warning-popup/Warning';
import useContextData from '../../hooks/useContextData';
import useClickOutside from '../../hooks/useClickOutside';

const Post = ({ creatorname, creatorimage, likes, createdOn, caption, postImage, postId, creatorId }: ofPostProps) => {
    const [like, setLike] = useState(0)
    const [disable, setDisable] = useState(false)
    const [optionsDisplay, setOptionsDisplay] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [savedPost, setSavedPost] = useState(false)
    const [focusCount, setFocusCount] = useState(0)
    const [warningDisplay, setWarningDisplay] = useState(false)

    const { userData: { _id, userimage, username, saved }, renewUserData, renewPosts } = useContextData()

    const LikePost = async () => {
        return await axios.post(LikePostUrl, { userId: _id, postId }).then(res => {
            setLike(prev => prev + 1)
            setDisable(true)
            if (res.status == 200) {
                toast.success("Posts like are synced!")
            }
        }).catch(err => {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message)
            }
            else {
                setDisable(false)
                toast.error("Could not complete your Like request!")
            }
        })
    }

    const deletePost = async () => {
        setProcessing(true)
        const Url = deletePostUrl + "/" + _id + "/" + postId;
        toast.promise(
            axios.delete(Url),
            {
                pending: "Deleting the Post",
                success: {
                    render: () => {
                        setProcessing(false)
                        setWarningDisplay(false)
                        renewPosts()
                        renewUserData()
                        return toast.success("Successfully Deleted")
                    }
                },
                error: {
                    render: (err) => {
                        setProcessing(false)
                        console.error(err)
                        return toast.error("Something went wrong")
                    }
                }
            }
        )
    }

    const saveThePost = async () => {
        setProcessing(true)
        await axios.post(savePostUrl, { userId: _id, postId: postId }).then(res => {
            if (res.status == 200) {
                setSavedPost(true)
                setProcessing(false)
                renewUserData()
                toast.success("Successful")
            }
        }).catch(err => {
            setProcessing(false)
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message)
            }
            else {
                toast.error("Something went wrong")
                console.error(err)
            }
        })
    }
    const handleCancel = () => {
        setOptionsDisplay(false)
    }

    const ref = useRef<HTMLElement>(null)
    useClickOutside(ref, handleCancel)
    return (
        <>
            <main className='p-2 max-w-[600px] w-full flex flex-col gap-[1rem] bg-transparent backdrop-blur-[1px] rounded-lg border border-pickedColor'>
                <section>
                    <div className='flex justify-between items-center text-white'>
                        <div className='flex items-center gap-2'>
                            <img src={creatorimage} alt="userImage" className='h-8 w-8 rounded-full' />
                            <p>{creatorname}</p>
                            <BsDot />
                            <Timeago createdOn={createdOn} />
                        </div>
                        <span ref={ref} className={`relative ${_id === creatorId ? "" : "hidden"}`}>
                            <BsThreeDots className='hover:text-gray-400 cursor-pointer' onClick={() => setOptionsDisplay(prev => !prev)} />
                            {optionsDisplay && <Options deletePost={() => {
                                setOptionsDisplay(false)
                                setWarningDisplay(true)
                            }} handleCancel={handleCancel} />}
                        </span>
                    </div>
                </section>
                <section>
                    <img src={postImage} alt="postImage" className='rounded-lg mb-2 w-[100%] object-cover sm:w-[580px] min-h-[320px] max-h-[600px]' />
                    <span className='text-white'>{likes.length + like} {(likes.length + like) > 1 ? "people" : "person"} liked</span>
                    <p className='text-white font-mono'>{caption}
                    </p>
                </section>
                <section className='flex gap-3'>
                    <PostButton
                        title={`${likes.includes(_id) || disable ? "Liked" : "Like"}`}
                        icon={FaHeart} color={likes.includes(_id) || disable ? "text-rose-400" : ""}
                        btnFunction={LikePost} disable={likes.includes(_id) || disable}
                    />
                    <PostButton
                        title='Comment'
                        icon={FaComment}
                        btnFunction={() => setFocusCount(prev => prev + 1)}
                    />
                    <PostButton
                        title={`${saved.includes(postId) || savedPost ? "Saved" : "Save"}`}
                        icon={saved.includes(postId) || savedPost ? TiTick : BsFillPlusCircleFill}
                        disable={processing || saved.includes(postId) || savedPost}
                        btnFunction={() => saveThePost()}
                    />
                </section>
                <PostComments _id={_id} postId={postId} userimage={userimage} username={username} focusCount={focusCount} />
            </main>
            <Warning message="Are you sure you want to delete this post?" onCancel={() => setWarningDisplay(false)} display={warningDisplay} onConfirm={deletePost} processing={processing} />
        </>
    )
}

export default Post
