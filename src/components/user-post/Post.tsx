import { useState } from 'react'
import { BsHeartFill,BsFillChatFill } from "react-icons/bs"
import { ofComment } from '../../types'
import "./post.css"

const Index = ({id, postImage,likes,comments }: {id:string, postImage: string,likes:string[],comments:ofComment[] }) => {
    const [isHovering, setIsHovering] = useState(false)
    return (
        <main id={id} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="relative">
            <section>
                <img src={postImage} alt="postImage" className={`w-[300px] h-[320px] object-cover rounded-lg transition-all border border-pickedColor ${isHovering ? "myBlur" : ""}`} />
            </section>
            {isHovering &&
                <section className='absoluteCenter text-second flex items-center gap-3 text-2xl bg-fourth p-2 rounded-md'>
                    <div className='flex items-center cursor-default '>
                        <BsHeartFill className='translate-y-[1px]'/> &nbsp; <b>{likes.length}</b>
                    </div>
                    <div className='flex items-center cursor-default'>
                        <BsFillChatFill className='translate-y-[-1px]' />&nbsp; <b>{comments.length}</b>
                    </div>
                </section>
            }
        </main>
    )
}

export default Index
