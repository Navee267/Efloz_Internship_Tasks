import React, { useState } from 'react'
import loginimg from "../Assets/login.jpg"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"

const Register = () => {
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('user')
    const [phone,setPhone] = useState('')

    const navigate = useNavigate()

    const handleLog = async(e)=>{
        e.preventDefault()
        try{
            const res = await fetch('http://localhost:5000/login/reg',{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include",
                body : JSON.stringify({name,email,role,phone,password})
            })

            const data = await res.json()
            console.log('data', data)

            if(res.ok){
                alert('Sign In successful go to login')
                navigate('/')
            }
        }
        catch(err){
            alert('something went wrong',err.message)
        }
    }
  return (
    <div className='w-full h-full'>
        <div className='flex w-full h-full'>
            <div className='md:flex hidden w-2/5 h-full'><img src={loginimg} alt="loginimage" /></div>
            <div className=' h-full flex flex-col justify-center items-center md:w-3/5 w-full  mt-10'>
           <div className='border-2 w-fit h-full rounded-md p-10 flex flex-col'>
           <h2 className='font-display w-fit text-2xl italic font-medium mb-3'>Welcome To Cash Guardian</h2>
                <form onSubmit={handleLog} className='flex w-full h-full flex-col justify-center space-y-5'>
                    <h3 className='font-body text-xl'>Log In</h3>
                    <input type="text" placeholder='Name' className='input' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="password" placeholder='Password' className='input' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <input type="email" placeholder='Email' className='input' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" placeholder='Phone' className='input' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    <input type="text" placeholder='Role' className='input' value={role} readOnly onChange={(e)=>setRole(e.target.value)}/>
                    <button className=' w-fit font-display border-2 pt-1 pb-1 pr-3 pl-3 rounded-md hover:bg-slate-400 hover:text-white hover:transform ease-in-out duration-300' type='submit'>Sign Up</button>
                    <span className='font-display'> have an Account ? <Link to='/' className='text-blue-400 font-display'>Log In</Link></span>
                </form>
           </div>
            </div>
        </div>
    </div>
  )
}

export default Register