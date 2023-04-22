
const FoundedUser = ({ username, userimage }: { username: string, userimage: string }) => {
  return (
    <main className='flex gap-2 items-center border-2 min-w-full p-2 rounded-md bg-blue-100'>
      <img src={userimage} alt={userimage} className="h-16 w-16 rounded-full" />
      <span className="text-black font-semibold underline">{username}</span>
    </main>
  )
}

export default FoundedUser
