import { FormEvent, useEffect, useRef, useState, ChangeEvent } from 'react'
import { AddCommentUrl } from '../../constants/constants'
import axios from 'axios'
import { toast } from 'react-toastify';
type ofComment = { username: string, userimage: string, userId: string, commentBody: string, postId: string }

const Form = ({ username, userimage, userId, postId, reloadComments, focusCount }: { username: string, userimage: string, userId: string, postId: string, reloadComments: () => void, focusCount: number }) => {
    const [comment, setComment] = useState<ofComment>({ username, userimage, userId, commentBody: "", postId })
    const [processing, setProcessing] = useState(false)
    const [isValid, setIsvalid] = useState(false)

    const handleOnChange = (event: ChangeEvent) => {
        const { value } = event.target as HTMLInputElement
        setComment(prev => ({ ...prev, commentBody: value }))
    }

    const addAComment = async (event: FormEvent) => {
        event.preventDefault()
        setProcessing(true)
        await axios.post(AddCommentUrl, comment).then(res => {
            console.log(comment)
            if (res.status == 201) {
                setProcessing(false)
                setComment(prev => ({ ...prev, commentBody: "" }))
                reloadComments()
                toast.success("Successful")
            }
        }).catch(err => {
            setProcessing(false)
            toast.error("Something went wrong")
            console.log(err)
        })
    }
    const ref = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (focusCount > 0) {
            ref.current?.focus()
        }
        let spaceLessComment = comment.commentBody.split("").filter(letters => letters !== " ").join("")
        spaceLessComment ? setIsvalid(true) : setIsvalid(false)
    }, [focusCount,comment.commentBody])
    return (
        <main>
            <form onSubmit={(event) => addAComment(event)} className='flex flex-col gap-1 relative'>
                <textarea ref={ref} className='bg-transparent font-mono text-white outline-none rounded-sm p-2 w-[90%]' value={comment.commentBody} placeholder='Add a Comment' onChange={(event) => handleOnChange(event)} required></textarea>
                <button className='text-third disabled:hover:text-third hover:text-fourth p-1 rounded-md self-end absolute top-[2px]' disabled={processing || !comment.commentBody || !isValid}>{processing ? "Posting" : "Post"}</button>
            </form>
        </main>
    )
}

export default Form
