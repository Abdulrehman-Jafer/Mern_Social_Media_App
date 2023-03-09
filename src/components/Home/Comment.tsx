import React, { useContext } from 'react'
const Comment = ({ username, userimage, commentBody }: { username: string, userimage: string, commentBody: string }) => {
    return (
        <main className='text-white flex gap-3 items-center border-fourth'>
            <section className='cursor-default flex items-center bg-pickedColor p-1 rounded-sm'>
                <img src={userimage} alt={userimage} className="h-8 w-8 rounded-full" />
                <span className='cursor-default text-orange-200 font-bold'>{username}</span>
            </section>
            <section>
                {commentBody}
            </section>
        </main>
    )
}

export default Comment
