import {useDispatch} from 'react-redux'
import { useState, useEffect } from 'react'
import authService from './appwrite/auth'
import {login, logout} from "./store/authSlice";
import './App.css'
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true)
  const disPatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        disPatch(login({userData}))
      } else {
        disPatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
         TODO: <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
