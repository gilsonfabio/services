'use client'
import React, { useState } from "react";

function Submenu({options}:{[key:string]:any}) {
  
  function goBack() {
    window.history.back()
  }
  
  return (    
    <div className="dark:bg-zinc-900">
      {options.map((option:any) => (
      <div key={option.menId} >  
        <nav className="flex flex-row bg-white dark:bg-zinc-900 rounded-md mt-10 md:mt-16 ml-5 md:ml-20">
          {option.breadcrumbs.map((row: any, idx:number) => (
            <ul key={idx} className="w-auto h-auto flex flex-row items-center justify-center">           
              <li><button onClick={goBack} className="text-green-600 hover:text-green-700 text-xs md:text-sx">{row.descricao}</button></li>
              <li className="text-gray-500 md:mx-2 ml-1">/</li>
              <li className="text-gray-500 text-xs md:text-sx">{option.menTitle}</li>
            </ul>
           ))}          
        </nav> 
        <div className="text-2xl md:text-4xl mb-3 font-bold ml-5 md:ml-20">
          {option.menTitle}
        </div>
      </div>  
      ))}
      <div className="bg-gray-300 w-full h-12">

      </div>
    </div>
  );
}

export default Submenu;