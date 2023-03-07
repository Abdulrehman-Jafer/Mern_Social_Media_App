import React, { useContext } from 'react'
const Comment = ({username,userimage,commentBody}:{username:string,userimage:string,commentBody:string}) => {
    return (
        <main className='text-white flex items-center gap-1'>
            <section className='cursor-default'>
                <img src={userimage} alt={userimage} className="h-8 w-8 rounded-full" />
            </section>
            <section className='w-[90%]'>
                <p className='text-white'> <span className='underline cursor-default'>{username}</span> ---{'>'} 
                {commentBody}
                </p>
            </section>
        </main>
    )
}

export default Comment
