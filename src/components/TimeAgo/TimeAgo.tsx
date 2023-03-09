import React from 'react'
import TimeAgo from 'react-timeago';
const Timeago = ({createdOn}:{createdOn:string}) => {
    let date = new Date(createdOn).getTime()
    // adding 60000 to just trick the time according to my local time
    return (
        <main className='text-gray-500 flex gap-[2px]'><span className='sm:block hidden'>Posted:  </span> {<TimeAgo date={date + 600000} />}
        </main>
    )
}

export default Timeago
