import React, { FormEvent, useEffect, useState } from 'react'
import { uploadImage } from './FireBase'
import axios from "axios"
import { useContext } from 'react'
import { UserContext } from '../../context/context'
import { createPostUrl } from '../../globles/globles'
import Loader from '../../globles/Loader';

const CreatePostForm = ({ img, file, disable }: { img: string, file: File, disable: boolean }) => {
    const { userData, renewUserData } = useContext(UserContext)
    const { username, userimage, _id } = userData
    const [caption, setCaption] = useState("")
    const [processing, setProcessing] = useState(false)

    const OnSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setProcessing(true)
        const Image = await uploadImage(file)
        const data = {
            userId: _id,
            caption,
            image: Image
        }
        await axios.post(createPostUrl, data).then(res => {
            console.log(res)
            if (res.status == 201) {
                setProcessing(false)
                renewUserData()
                alert("Successful")
                window.location.reload()
            }
        }).catch(err => {
            setProcessing(false)
            console.log(err)
        }
        )
    }
    return (
        <main className='flex flex-wrap gap-3 w-[100%] items-center justify-center'>
            <section className='w-[100%] flex-1'>
                <img src={img} alt={img} className="w-[100%] min-w-[200px] h-[15rem] sm:h-[30rem] object-contain" />
            </section>
            <form onSubmit={(event) => OnSubmit(event)} className='flex flex-col gap-2 flex-1'>
                <div className='flex items-end gap-2'>
                    <img src={userimage} alt={userimage} className="h-8 w-8 rounded-full" />
                    <p>{username}</p>
                </div>
                <textarea
                    name="description"
                    placeholder='Caption'
                    value={caption} cols={30} rows={7}
                    className="indent-2 bg-rose-100 p-2 rounded-sm outline-none text-black"
                    onChange={(event) => setCaption(event.target.value)}
                    required
                >
                </textarea>
                <button type='submit' className={`bg-slate-500 text-lg font-bold p-2 rounded-[2rem] ${!disable ? "hover:bg-slate-600" : ""}`} disabled={processing || disable}>{processing ? <Loader/> : "Post Now"}</button>
            </form>
        </main>
    )
}

export default CreatePostForm
