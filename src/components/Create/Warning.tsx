import React from 'react'

const Warning = ({ display, yesHandler, cancelHandler }: { display: boolean, yesHandler: () => void, cancelHandler: () => void }) => {
    return (
        <main className={`absoluteCenter boxShadow ${display ? "" : "hidden"} z-50 text-white`}>
            <section className='max-w-[400px] h-[200px] bg-pickedColor flex flex-col justify-center p-2 rounded-[0.1rem]'>
                <h1 className='text-2xl border-b-2 mb-[1rem] pb-1 text-center'><b>Warning</b></h1>
                <h1>Your progress wont be saved. Would you like to discard all the changes ?</h1>
                <div className='flex gap-[1rem] self-end'>
                    <button className='bg-slate-800 text-white p-2 h-[3rem] w-[5rem] rounded-lg hover:bg-black' onClick={cancelHandler}>Cancel</button>
                    <button className='bg-slate-800 text-white p-2 h-[3rem] w-[5rem] rounded-lg hover:bg-black' onClick={yesHandler}>Yes</button>
                </div>
            </section>
        </main>
    )
}

export default Warning
