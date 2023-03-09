import React, { useEffect } from 'react';
import { CiWarning } from "react-icons/ci"

const Warning = ({
    display,
    message,
    onConfirm,
    onCancel
}: {
    display: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}) => {
    useEffect(() => {
        if (display) {
            document.body.style.overflow = "hidden"
        }
        else {
            document.body.style.overflow = "auto"
        }
    }, [display])
    return (
        <main
            className={`${display ? "" : "hidden"} fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50`}>
            <section
                className={`min-w-[280px] boxShadow ${display ? '' : 'hidden'} z-50 text-white bg-pickedColor gap-[1rem] flex flex-col justify-center p-2 rounded-[0.1rem]`}
                style={{ width: '400px', height: '200px' }}
            >
                <div className="text-2xl border-b-2 mb-[1rem] pb-1 flex items-center justify-center gap-2">
                    <CiWarning className='text-red-500 text-[2rem]'/>
                    <span>Warning</span>
                </div>
                <h1>{message}</h1>
                <div className="flex gap-[1rem] self-end">
                    <button
                        className="bg-slate-800 text-white p-2 h-[3rem] w-[5rem] rounded-lg hover:bg-black"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-slate-800 text-red-600 p-2 h-[3rem] w-[5rem] rounded-lg hover:bg-black"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Warning;
