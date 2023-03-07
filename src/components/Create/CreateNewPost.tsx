import React, { useRef, useState, ChangeEvent, useEffect } from 'react'
import CreatePostForm from './CreatePostForm'
import { FiArrowLeft } from "react-icons/fi"
import { RxCross2 } from "react-icons/rx"
import Warning from './Warning'

const CreateNewPost = ({ createPostDisplay = false, handleCreatePostDisplay }: { createPostDisplay: boolean, handleCreatePostDisplay: () => void }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState("")
    const [imageFile, setImageFile] = useState<File>()
    const [formDisplay, setFormDisplay] = useState(false)
    const [warningDisplay,setWarningDisplay] = useState(false)
    


    const addAnImage = () => {
        inputRef.current?.click()
    }

    const reader = new FileReader()
    const onChangeHandler = async (event: ChangeEvent) => {
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
    }
    const goBack = () => {
        window.location.reload()
        setImage("")
        setFormDisplay(false)
        setImageFile(undefined)
    }
    return (
        <>
            <main className={`absolute w-[100%] text-white z-30 h-[100%] flex items-center ${createPostDisplay ? "" : "hidden"}`}>
                <section
                    className='bg-pickedColor md:w-[50rem] w-[100%] lg:w-[50rem] mx-auto h-[40rem] boxShadow p-4'
                >
                    <div className='flex border-b-2 pb-[1rem] justify-center relative'>
                        <h1>Create New Post</h1>
                      { formDisplay ? <RxCross2 onClick={() => {
                            setWarningDisplay(true)
                        }}
                            className="absolute top-0 right-0"
                        /> :
                        <RxCross2 onClick={() => {
                            handleCreatePostDisplay()
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
                            <CreatePostForm img={image} file={imageFile!} disable={warningDisplay}/>
                        }
                        <input ref={inputRef} accept="image/*" type="file" className='hidden' onChange={(event) => onChangeHandler(event)} />
                    </div>
                </section>
            </main>
            <Warning display={warningDisplay} yesHandler = {goBack} cancelHandler = {()=>setWarningDisplay(false)}/>
        </>
    )
}

export default CreateNewPost
