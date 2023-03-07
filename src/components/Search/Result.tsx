import React from 'react'

const Result = ({username,userimage}:{username:string,userimage:string}) => {
  return (
    <main className='flex gap-2 items-center border-2 p-2 rounded-md'>
      <img src={userimage} alt={userimage} className="h-16 w-16 rounded-full" />
      <span>{username}</span>
    </main>
  )
}

export default Result
