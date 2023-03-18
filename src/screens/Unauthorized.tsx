import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <main className='text-white text-4xl text-center'>
      <h1>Unauthorized User</h1>
      <Link to={"/login"}><h1 className='text-underline font-serif underline font-bold cursor-pointer'>Click here to go Back to Login Screen</h1></Link>
    </main>
  )
}

export default Unauthorized
