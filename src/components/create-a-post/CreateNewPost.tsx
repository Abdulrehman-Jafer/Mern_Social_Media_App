import { useRef, useState, ChangeEvent } from 'react'
import Form from './Form'
import { FiArrowLeft } from "react-icons/fi"
import { RxCross2 } from "react-icons/rx"
import Warning from '../warning-popup/Warning'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'

const CreateNewPost = ({ createPostDisplay = false, hideCreatePost }: { createPostDisplay: boolean, hideCreatePost: () => void }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState("")
    const [imageFile, setImageFile] = useState<File>()
    const [formDisplay, setFormDisplay] = useState(false)
    const [warningDisplay, setWarningDisplay] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [key, setKey] = useState(v4());

    const addAnImage = () => {
        inputRef.current?.click()
    }

    const reader = new FileReader()
    const imageOnChangeHandler = async (event: ChangeEvent) => {
        const { files } = event.target as HTMLInputElement
        if (!files) {
            return
        }
        if (!files[0]?.type.startsWith("image/")) {
            throw alert("Please provide valid file")
        }
        reader.onload = (event) => {
            setImage(event.target?.result as string)
        }
        setImageFile(files[0])
        reader.readAsDataURL(files[0])
        setFormDisplay(true)
        setKey(v4())
    }

    const goBack = () => {
        if (isUploading) {
            return toast.warning("Upload is in progress")
        }
        setImage("")
        setFormDisplay(false)
        setImageFile(undefined)
    }
    const setUploading = (boolean: boolean) => {
        console.log("called")
        setIsUploading(boolean)
    }
    const handleOnComplete = () => {
        setWarningDisplay(false)
        setFormDisplay(false)
        setImage("")
        setImageFile(undefined)
        hideCreatePost()
    }
    return (
        <>
            <main className={`fixed w-screen h-screen text-white z-30 flex justify-center items-center ${createPostDisplay ? "" : "hidden"}`}>
                <section
                    className='bg-pickedColor md:w-[50rem] w-full lg:w-[50rem] mx-auto h-[40rem] boxShadow p-4'
                >
                    <div className='flex border-b-2 pb-[1rem] justify-center relative'>
                        <h1>Create New Post</h1>
                        {formDisplay ? <RxCross2 onClick={() => {
                            setWarningDisplay(true)
                        }}
                            className="absolute top-0 right-0"
                        /> :
                            <RxCross2 onClick={() => {
                                hideCreatePost()
                            }}
                                className="absolute top-0 right-0"
                            />}
                        {formDisplay && <FiArrowLeft className='absolute top-0 left-0 text-lg' onClick={goBack} />}
                    </div>
                    <div className='flex flex-col justify-center items-center w-[100%] h-[100%]'>
                        {!formDisplay
                            ?
                            <button className='bg-blue-500 p-3 text-2xl cursor-pointer rounded-lg' onClick={addAnImage}>
                                Add an Image
                            </button>
                            :
                            <Form img={image} file={imageFile!} disable={warningDisplay} setUploading={setUploading} handleOnComplete={handleOnComplete} />
                        }
                        <input ref={inputRef} accept="image/*" type="file" key={key} className='hidden' onChange={(event) => imageOnChangeHandler(event)} />
                    </div>
                </section>
            </main>
            <Warning message='Your progress wont be saved. Would you like to discard all the changes ?' display={warningDisplay} onConfirm={handleOnComplete} onCancel={() => setWarningDisplay(false)} />
        </>
    )
}

export default CreateNewPost
