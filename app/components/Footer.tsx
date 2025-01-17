import React from "react";
import Image from "next/image";

import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaHandsWash } from 'react-icons/fa';

import imgBandeira from '../../public/bandeirabrasao.png'
import imgRadar from '../../public/radardatransparencia.png';
import Link from "next/link";

interface options {
  carId: number;
  carTitle: string;
  carTexto?: string;
  carLink?: string;
  carImage: string;
}

const Footer = ({options}:{[key:string]:any}) => {
    return (
        <div className="bg-gray-200 dark:bg-black dark:text-white p-2 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2">  
            <div className='w-auto h-auto flex justify-center items-center col-span-1 p-2 mt-3 '>
                <Link href="https://www.aparecida.go.gov.br/" >
                    <Image className= "w-100 h-40 hover:cursor-pointer" src={imgBandeira} alt="" /> 
                </Link>                  
            </div>            
            <div className='col-span-1 mt-5 p-2 mr-20'>
                <div className="md:mr-20 w-full ">
                    Rua Gervásio Pinheiro, APM Residencial Solar Central Park CEP: 74.968-500 Horário de Funcionamento: 08h as 11h30 - 13h as 17h30 Telefone: (62) 3545-5800 / 3545-5801  
                </div> 
                    <div className="flex flex-row items-center justify-center mt-5" >
                        <Link href="https://www.facebook.com/PrefAparecida/" passHref target="_blank" className="text-black hover:text-gray-400 px-6 py-2 text-sm font-medium">
                                <FaFacebook className="w-6 h-6 fa-solid fa-circle-info dark:text-white"/>
                        </Link>
                        <Link href="https://www.instagram.com/prefaparecida/" passHref target="_blank" className="text-black hover:text-gray-400 px-6 py-2 text-sm font-medium">
                                <FaInstagram className="w-6 h-6 fa-solid fa-circle-info dark:text-white"/>
                        </Link>
                        <Link href="https://www.youtube.com/channel/UC-YvAQ4nT9_sewdzsp1zWjw" passHref target="_blank" className="text-black hover:text-gray-400 px-6 py-2 text-sm font-medium">
                                <FaYoutube className="w-6 h-6 fa-solid fa-circle-info dark:text-white"/>
                        </Link>
                    </div>
            </div>
            <div className='flex justify-center items-center col-span-1 p-2 mt-3 '>
                <Link href="https://transparencia.atricon.org.br" target="_blank">
                    <Image className= "w-60 h-40" src={imgRadar} alt="" /> 
                </Link>             
            </div>
        </div>   
    );
}

export default Footer;