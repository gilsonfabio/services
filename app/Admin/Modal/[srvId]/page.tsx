"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../components/Services/api';
import Link from 'next/link';

type ServicesProps = {
  "srvId": number; 
  "srvMsvId": number; 
  "srvTsvId": number; 
  "srvDescricao": string; 
  "srvSecId": number; 
  "srvObjetivo": string; 
  "srvInformacao": string; 
  "srvLink": string; 
  "srvStatus": string;
  "secDescricao": string;
}

export default function Modal({ params }: any) {
  const [servicos, setServicos] = useState<Array<ServicesProps>>([]);

  const [descricao, setDescricao] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [link, setLink] = useState('');
  const [informacoes, setInformacoes] = useState('');


  useEffect(() => {   
    let idSrv = params.srvId;
    axios({
        method: 'get',    
        url: `https://backservices.vercel.app/searchServ/${idSrv}`
    }).then(function(response) {
        setServicos(response.data)
        console.log(response.data)
        setDescricao(response.data[0].srvDescricao)
        setObjetivo(response.data[0].srvObjetivo)
        setInformacoes(response.data[0].srvInformacao)
        setLink(response.data[0].srvLink)
        console.log('Serviço Acessado:', descricao)
    }).catch(function(error) {
        console.log(error)
    })
           
  }, [])

  function goBack() {
    window.history.back()
  }

  return (
    <div className='flex flex-col justify-between w-full h-full px-2 md:px-20 '>
      <div className='flex flex-row items-center justify-between '>
        <h1 className='text-lg md:text-2xl font-bold text-green-600 dark:text-white mt-5 mb-5'>{descricao}</h1>
        <button onClick={goBack} className="bg-white text-black border border-[#008C3D] hover:bg-[#008C3D] hover:text-white flex flex-row items-center justify-center ml-20 md:ml-0 w-20 md:w-52 h-10 p-2 rounded-lg" >
          <span className='text-sm md:text-base font-bold'>Voltar</span>
        </button>
      </div>
      <div className='flex flex-col w-full h-72 py-6 px-2 bg-gray-100 dark:bg-white rounded-2xl overflow-hidden shadow-2xl'>
        <span className='text-lg md:text-2xl font-bold mt-6 dark:text-black '>Objetivo:</span>
        <span className='text-lg md:text-2xl font-normal mt-6 dark:text-black'>{objetivo}</span>
      </div>
      <div className='flex flex-row items-center w-full h-72 px-2 bg-slate-200 dark:bg-white rounded-2xl mt-10 overflow-hidden shadow-2xl'>
        <span className='text-lg md:text-2xl font-bold mr-5 dark:text-black'>Link de Acesso:</span>
        <Link href={link} passHref className='cursor-pointer dark:text-black'>
          <span className='text-lg md:text-2xl font-normal dark:text-black'>{link === '' ? "Serviço modalidade presencial" : link}</span>
        </Link>  
      </div>
      <div className='flex flex-col w-full h-72 py-6 px-2 bg-white rounded-2xl mt-10 mb-10 overflow-hidden shadow-2xl'>
        <span className='text-lg md:text-2xl font-bold mt-6 dark:text-black'>Informações:</span>
        <span className='text-lg md:text-2xl font-normal mt-6 dark:text-black'>{informacoes}</span>
      </div>
    </div>       
  )
}
