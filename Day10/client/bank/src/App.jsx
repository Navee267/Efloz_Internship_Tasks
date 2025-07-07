
import {useState,useEffect} from 'react'
import {HashRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import Account from "./Pages/Account"
import Profile from "./Pages/Profile"
import Contact from "./Pages/Contact"
import About from "./Pages/About"
import Navbar from "./Pages/Navbar"
import History from './Pages/History'
import DashBoard from './Pages/DashBoard'
import Alltransactions from './Pages/Alltransactions'
import Allusers from './Pages/Allusers'
import AllAcc from './Pages/AllAcc'


const App = () => {
    const [isLoggedin, setIsLoggedin] = useState(false)

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedin(document.cookie.includes('token='))
    }

    checkLogin()

    window.addEventListener('storage', checkLogin)

    return () => window.removeEventListener('storage', checkLogin)
  }, [])
  return (
    <Router>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Login onLogin={() => setIsLoggedin(true)} />} />
            <Route path='/reg' element={<Register/>}/>
            <Route path='/home' element={isLoggedin ? <Home /> : <Navigate to='/' />} />
        <Route path='/acc' element={isLoggedin ? <Account /> : <Navigate to='/' />} />
        <Route path='/profile/:id' element={isLoggedin ? <Profile /> : <Navigate to='/' />} />
        <Route path='/about' element={isLoggedin ? <About /> : <Navigate to='/' />} />
        <Route path='/contact' element={isLoggedin ? <Contact /> : <Navigate to='/' />} />
        <Route path='/history' element={isLoggedin ? <History /> : <Navigate to='/' />} />
        <Route path='/dashboard' element={isLoggedin ? <DashBoard /> : <Navigate to='/' />} />
        <Route path='/alltransactions' element={isLoggedin ? <Alltransactions /> : <Navigate to='/' />} />
        <Route path='/allusers' element={isLoggedin ? <Allusers /> : <Navigate to='/' />} />
        <Route path='/allacc' element={isLoggedin ? <AllAcc /> : <Navigate to='/' />} />
        </Routes>
    </Router>
  )
}

export default App