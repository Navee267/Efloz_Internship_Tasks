import React from 'react'
import {Link,useNavigate} from "react-router-dom"
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname
    const handleLogout = async () => {
        try {
          await fetch('http://localhost:5000/logout', {
            method: 'GET',
            credentials: 'include', 
          })
          alert("Logged out ✅")
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            navigate('/')
            window.location.reload()
        } catch (err) {
          alert("Logout failed ❌")
        }
      }

      const showButton = path==='/' || path === 'reg'
  return (
    <div>
        <nav className='flex h-20 w-full justify-around items-center border-b-2 relative'>
            <h2 className='logo'>Cash Guardian</h2>
            <ul className='flex space-x-6 bg-slate-300 pt-2 pb-2 pr-5 rounded-md pl-5  md:static absolute top-20'>
                <Link to='/home' className='list'>Home</Link>
                <Link to='/acc' className='list'>Account</Link>
                <Link to='/profile/:id' className='list'>Profile</Link>
                <Link to='/about' className='list'>About</Link>
                <Link to='/contact' className='list'>Contact</Link>
                <Link to='dashboard' className='list'>Admin</Link>
            </ul>
            {showButton ? (
                <div className='space-x-3'>
                <span className='log'><Link to='/'>Log In</Link></span>
                <span className='reg'><Link to='/reg'>Sign Up</Link></span>
            </div>
            ) : <div className='space-x-3'>
                <span className='log' onClick={handleLogout}>Log Out</span>
                </div>}
        </nav>
    </div>
  )
}

export default Navbar