
const Settings = ({ display = false, LogOut, cancel }: { display: boolean, LogOut: () => void, cancel: () => void }) => {
  return (
    <main className={`absolute flex flex-col justify-center items-center sm:left-[8rem] left-[1rem] top-7 sm:top-[1rem] p-1 ${display ? "" : "hidden"}`}>
      <button className='bg-slate-200 text-black hover:bg-white p-2 font-semibold w-full whitespace-nowrap border-b border-zinc-600' onClick={LogOut}>Log Out</button>
      <button className='bg-slate-200 text-black hover:bg-white p-2 font-semibold w-full' onClick={cancel}>Cancel</button>
    </main>
  )
}

export default Settings
