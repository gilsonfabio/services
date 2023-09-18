"use client"
import React, { useState } from 'react';
import { Transition } from "@headlessui/react";
import { useTheme} from "next-themes"
import Image from 'next/image'

import { FaEllipsisV } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaAdjust } from 'react-icons/fa';
import { FaHandsWash } from 'react-icons/fa';
import { FaHandPaper } from 'react-icons/fa';
import { FaSitemap } from 'react-icons/fa';
import { FaUniversalAccess } from 'react-icons/fa';
import Link from "next/link";

import logoBarra from '../../../public/logo-barra.png';
import logoAcesso from '../../../public/acesso-informacao.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme} = useTheme();

  const handleFontLarge = () => {
    const root: any = document.querySelector('html');
    const currentSize = parseInt(getComputedStyle(root).fontSize);
    const newSize = currentSize + 2;
    root.style.fontSize = `${newSize}px`;
  }

  const handleFontSmall = () => {
    const root: any = document.querySelector('html');
    const currentSize = parseInt(getComputedStyle(root).fontSize);
    const newSize = currentSize - 2;
    root.style.fontSize = `${newSize}px`;
  }

  return (
    <div>
      <div className='flex flex-row items-center justify-between w-full h-20 bg-black text-white px-2 md:px-20 z-10'>
        <Image src={logoBarra} alt="" width={170} height={40} />
        <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                    <button className="text-white hover:text-gray-400 px-1 py-2 text-sm font-medium" onClick={() => {}}></button>
                    <Link href="/acessibilidade" passHref className="flex flex-row items-center text-white hover:text-gray-400 px-1 py-2 text-sm font-medium ">
                        <FaUniversalAccess className="w-5 h-5 fa-solid fa-circle-info mr-2"/>
                        <p className="text-sm">Acessibilidade</p>                      
                    </Link>                    
                    <Link href="/sitemap" passHref className="text-white hover:text-gray-400 px-1 py-2 text-sm font-medium">
                        <FaSitemap className="w-5 h-5 fa-solid fa-circle-info"/>                      
                    </Link> 
                    <Link href="/acessoinformacao" passHref className="text-white hover:text-gray-400 px-1 py-2 text-sm font-medium">
                        <Image src={logoAcesso} alt="acesso a informação" className="w-5 h-5 "/>
                    </Link> 
                    <button 
                      className="btn inline-block px-2 py-1 -mt-3 text-white font-medium text-xs leading-tight uppercase rounded hover:text-gray-600 transition duration-150 ease-in-out" 
                      type="button"
                      id="button-search" 
                      onClick={handleFontSmall}>
                        <p className="w-4 h-4 rounded-r-lg text-xl">A-</p>
                    </button>              
                    <button 
                      className="btn inline-block px-2 py-1 -mt-3 text-white font-medium text-xs leading-tight uppercase rounded hover:text-gray-600 transition duration-150 ease-in-out" 
                      type="button"
                      id="button-search"
                      onClick={handleFontLarge}>
                        <p className="w-4 h-4 rounded-r-lg text-xl">A+</p>
                    </button>              
                    <button 
                      className="text-white hover:text-gray-400 px-3 py-2 text-sm font-medium" 
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        <FaAdjust className="w-4 h-4 fa-solid fa-circle-info"/>
                    </button>                   
                </div>
              </div>
        <div className={!isOpen ? 'md:hidden flex flex-col mb-3 mt-4 w-12 p-3 bg-black items-center justify-between gap-5 z-20' : 'md:hidden flex flex-col mb-3 mt-60 w-12 p-3 bg-black items-center justify-between gap-5 z-20' }>
          <div className="">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-light "
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {!isOpen ? (
                <FaEllipsisV className="w-5 h-5 fa-solid"/>
              ) : (
                <FaTimes className="w-5 h-5 fa-solid"/>
              )}
            </button>
          </div>
          
          <div className={!isOpen ? "hidden" : ""}>
            <Link href="/acessibilidade" passHref className="flex flex-row items-center text-white hover:text-gray-500">
              <FaUniversalAccess className="w-4 h-4 fa-solid fa-circle-info"/>
            </Link>    
          </div>
          <div className={!isOpen ? "hidden" : ""}>
            <Link href="/sitemap" passHref className="text-white hover:text-gray-500">
              <FaSitemap className="w-4 h-4 fa-solid fa-circle-info"/>     
            </Link>    
          </div>
          <div className={!isOpen ? "hidden" : ""}>
            <Image src={logoAcesso} alt="acesso a informação" className="w-4 h-4 "/>
          </div>
          <div className={!isOpen ? "hidden" : ""}>
            <button 
              className="text-white font-medium text-xs leading-tight uppercase rounded hover:text-gray-600 transition duration-150 ease-in-out" 
              type="button"
              id="button-search"
              onClick={handleFontSmall}>
              <p className="w-4 h-4 rounded-r-lg text-xl">A-</p>
            </button>    
          </div>
          <div className={!isOpen ? "hidden" : ""}>
            <button 
              className="text-white font-medium text-xs leading-tight uppercase rounded hover:text-gray-600 transition duration-150 ease-in-out" 
              type="button"
              id="button-search"
              onClick={handleFontLarge}>
              <p className="w-4 h-4 rounded-r-lg text-xl">A+</p>
            </button>    
          </div>
          <div className={!isOpen ? "hidden" : ""}>
            <button 
              className="text-white hover:text-gray-500 text-sm font-medium" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <FaAdjust className="w-4 h-4 fa-solid fa-circle-info"/>
            </button>
          </div>
        </div>
      </div>                
    </div>
  )
}
