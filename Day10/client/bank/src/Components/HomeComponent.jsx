import React from 'react';
import homejson from "../json/home.json"
import {Link} from "react-router-dom"

const HomeComponent = () => {
  return (
    <div>
        <div className='w-full h-full gap-2 grid md:grid-cols-3 md-lg:grid-rows-3 md-lg:grid-cols-1 md:grid-rows-1 grid-rows-3 grid-cols-1'>
           {
            homejson.map((item,idx)=>(
                <div key={idx} className={`border-2 p-8 rounded-md m-2 ${idx===1 ? 'bg-amber-200' : 'bg-cyan-300'} hover:bg-slate-300 hover:transform ease-in-out duration-300`}>
                    <h2 className='font-body text-2xl font-medium mb-2'>{item.title}</h2>
                    <h3 className='font-display text-xl text-slate-500 mb-4 h-fit'>{item.description}</h3>
                    <Link to={item.redirect} className='border-2 rounded-xl p-3 hover:bg-slate-500 text-green-500 hover:transform ease-in-out duration-300'>{item.cta}</Link>
                </div>
            ))
           }  
        </div>
    </div>
  )
}

export default HomeComponent