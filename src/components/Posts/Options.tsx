const Options = ({deletePost,handleCancel}:{deletePost:()=>void,handleCancel:()=>void}) => {
  return (
    <main className='absolute right-0 p-2 flex flex-col rounded-sm'>
      <span className='whitespace-nowrap hover:bg-black cursor-pointer bg-pickedColor p-1 border-b border-slate-400 text-red-500' onClick={deletePost}>Delete Post</span>
      <span className='whitespace-nowrap hover:bg-black cursor-pointer bg-pickedColor p-1' onClick={handleCancel}>Cancel</span>
    </main>
  )
}

export default Options
