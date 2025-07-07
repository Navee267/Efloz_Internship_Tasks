import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HomeComponent from '../Components/HomeComponent';
import { faBank } from '@fortawesome/free-solid-svg-icons';
import increase from "../Assets/increase.png"

const Home = () => {
  return (
    <div className='flex w-full h-full'>
        <div className='w-full h-full flex flex-col'>
            <div className='flex w-fit h-full md:m-10 mt-14 p-4  justify-center items-center space-x-20 md:static relative'>
                <img className='md:w-1/4 h-72 md:flex hidden z-10 w-full' src={increase} alt="increasebank" />
                <h2 className=' text-4xl w-fit md:text-7xl md:w-3/4 leading-relaxed font-display font-semibold text-slate-600'>Banking ReImagined <FontAwesomeIcon icon={faBank} className='text-green-500 '/> Simple, <span className='text-green-500 font-body'>Smart,</span> Secure.</h2></div>
            <div>
                <HomeComponent/>
            </div>
        </div>
    </div>
  )
}

export default Home
