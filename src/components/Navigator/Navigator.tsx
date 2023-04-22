import React, { useState } from 'react'
import { IconType } from 'react-icons'

type Props = {
    title: string,
    icon?: IconType,
    img?: string
    clickHandler?: () => void
    active?: boolean
}

const Navigator = ({ title, icon, img, clickHandler, active }: Props) => {
    const [isHovering, setIsHovering] = useState(false)
    const handleMouseEnter = () => {
        setIsHovering(true)
    }
    const handleMouseLeave = () => {
        setIsHovering(false)
    }
    return (
        <main
            className={`flex items-center gap-4 hover:bg-pickedColor p-2 cursor-pointer ${active ? "bg-pickedColor" : ""} text-white`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => clickHandler && clickHandler()}>
            <section className={`text-3xl min-h-8 min-w-8 ${isHovering ? "scale-[1.05] font-bold" : ""} ${active ? "scale-[1.05] font-bold" : ""}`}>
                {icon ? React.createElement(icon) : <img src={img} alt={img} className="`h-[100%] w-[100%] max-h-[30px] max-w-[30px] rounded-full shrink-0" />}
            </section>
            <span className='sm:block hidden'>{title}</span>
        </main>
    )
}

export default Navigator
