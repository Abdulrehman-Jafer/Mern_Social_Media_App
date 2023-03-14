import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationRoutes from './components/navigation_routes/NavigationRoutes'


const App = () => {

  return (
    <main className='w-[100%] min-h-[100vh] bg-black'>
      <NavigationRoutes />
      <ToastContainer />
    </main>

  )
}

export default App
