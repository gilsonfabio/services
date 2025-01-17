"use client"
import React, { useState } from 'react'

export default function Home() {
    const [atualiza, setAtualiza] = useState(0);  
       
    return (
        <div className='w-full h-full z-30 bg-gray-300'>
            <div className='flex flex-row items-center justify-center'>
                <h1 className='text-white font-bold text-2xl'>Login</h1> 
            </div>       
        </div>
    )
}