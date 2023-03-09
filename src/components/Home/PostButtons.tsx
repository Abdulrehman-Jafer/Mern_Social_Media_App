import React from 'react'
import { IconType } from 'react-icons'
type Props = {
    title: string,
    icon: IconType,
    btnFunction?: () => Promise<void> | void,
    disable?: boolean
    color?:string
}


const PostButtons = ({ title, icon, btnFunction, disable,color }: Props) => {
    return (
        <div className={`flex gap-2 items-center ${disable ? "bg-blue-700" : "bg-blue-500"} px-4 rounded-lg hover:bg-blue-700 ${color ? color : "text-white"} h-[40px] ${disable ? "cursor-default" : "cursor-pointer"}`} onClick={btnFunction}>
            {React.createElement(icon)}
            <span className='hidden sm:block text-white'>{title}</span>
        </div>
    )
}

export default PostButtons
