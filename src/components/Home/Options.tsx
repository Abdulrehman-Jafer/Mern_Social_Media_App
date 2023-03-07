import React from 'react'

const Options = ({deletePost}:{deletePost:()=>Promise<void>}) => {
  return (
    <main className='absolute right-0 p-1 rounded-sm hover:bg-black cursor-pointer bg-pickedColor'>
      <span className='whitespace-nowrap' onClick={deletePost}>Delete Post</span>
    </main>
  )
}

export default Options
