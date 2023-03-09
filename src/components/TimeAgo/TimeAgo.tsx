import React from 'react'
import TimeAgo from 'react-timeago';
const Timeago = ({createdOn}:{createdOn:string}) => {
    let date = new Date(createdOn)
    return (
        <main className='text-gray-500 flex gap-[2px]'><span className='sm:block hidden'>Posted:  </span> {<TimeAgo date={date} />}
        </main>
    )
}

export default Timeago
