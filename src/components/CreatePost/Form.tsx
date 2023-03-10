import { FormEvent, useState } from 'react'
import { uploadImage } from '../../utils/firebase config/FireBase'
import axios from "axios"
import { createPostUrl } from '../../constants/constants'
import { toast } from "react-toastify"
import Loader from '../loader/Loader'
import useContextData from '../../hooks/useContextData'
const Form = ({ img, file, disable,setUploading }: { img: string, file: File, disable: boolean,setUploading:(boolean:boolean)=>void }) => {
    const { userData: { username, userimage, _id }, renewUserData } = useContextData()
    const [caption, setCaption] = useState("")
    const [processing, setProcessing] = useState(false)

    const OnSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setProcessing(true)
        setUploading(true)
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
                toast.success("Successful")
                setUploading(false)
                window.location.reload()
            }
        }).catch(err => {
            setProcessing(false)
            toast.error("Something went wrong")
            setUploading(false)
            console.log(err)
        }
        )
    }
    return (
        <main className='flex flex-wrap gap-3 items-center justify-center'>
            <section className=' flex-1 flex justify-center'>
                <img src={img} alt={img} className=" min-w-[280px] h-[15rem] sm:h-[30rem] object-contain " />
            </section>
            <form onSubmit={(event) => OnSubmit(event)} className='flex min-w-[280px] flex-col gap-2 flex-1'>
                <div className='flex items-end gap-2'>
                    <img src={userimage} alt={userimage} className="h-8 w-8 rounded-full" />
                    <p>{username}</p>
                </div>
                <textarea
                    name="description"
                    placeholder='Caption'
                    value={caption} cols={30} rows={5}
                    className="indent-2 bg-rose-100 p-2 font-mono rounded-sm outline-none text-black"
                    onChange={(event) => setCaption(event.target.value)}
                    required
                >
                </textarea>
                <button type='submit'
                    className={`bg-slate-500 text-lg p-2 font-mono font-medium rounded-sm disabled:hover:bg-slate-500 disabled:cursor-default hover:bg-slate-600`}
                    disabled={processing || disable}>
                    {processing ? <Loader /> : "Post Now"}
                </button>
            </form>
        </main>
    )
}

export default Form
