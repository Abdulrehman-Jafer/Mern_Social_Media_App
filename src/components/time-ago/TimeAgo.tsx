const Timeago = ({createdOn}:{createdOn:string}) => {
    const date = new Date(createdOn).toLocaleDateString("en-Pk")
    return (
        <main className='text-gray-500 flex sm:gap-[2px]'>
            <span className='sm:block hidden'>Posted on</span> <span>{date} </span>
        </main>
    )
}

export default Timeago
