import React, { Dispatch, SetStateAction, useState, createElement } from 'react'
import { IconType } from 'react-icons'
const InputFields = ({type="text", label, inputName, inputValue, setInputValue, icon }: {type?:string, label: string, inputName: string, inputValue: string, setInputValue: Dispatch<SetStateAction<any>>, icon?: IconType }) => {
    const [transform, setTransform] = useState(false)
    return (
        <div className='flex flex-col relative border-b-2 transition-all mb-[2rem]'>
            <label htmlFor={inputName} className={`absolute bottom-[9px] ${transform ? "translate30px" : ""} text-slate-300 transition-all`}>{label}</label>
            <input
                type={type}
                name={inputName}
                id={inputName}
                value={inputValue}
                minLength={6}
                autoComplete="off"
                autoCorrect='false'
                onChange={(event) => setInputValue((prev: any) => ({ ...prev, [event.target.name]: event.target.value }))}
                className='text-white indent-2 rounded-md noBg transition-all pb-2'
                onFocus={() => setTransform(true)}
                onBlur={() => inputValue ? "" : setTransform(false)}
                required
            />
            <div className='absolute text-white right-1'>
                {icon && createElement(icon)}
            </div>
        </div>
    )
}

export default InputFields
