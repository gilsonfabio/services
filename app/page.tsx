"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import qs from 'qs';

import api from './components/Services/api';
import { FaBars } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';
import { FaUsersCog } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import Link from 'next/link';
import Pagination from './components/Pagination/Pagination';

type ModServices = {
    "msvId": number;
    "msvDescricao": string;
}

type TipServices = {
    "tsvId": number;
    "tsvDescricao": string;
}

type ServicesProps = {
    "pagination": {
		"page": number;
		"per_page": number;
		"lastPage": number;
		"countUser": number;
		"offset": number
    }
    "srvId": number; 
    "srvMsvId": number; 
    "srvTsvId": number; 
    "srvDescricao": number; 
    "srvSecId": number; 
    "srvObjetivo": string; 
    "srvInformacao": string; 
    "srvLink": string; 
    "srvStatus": string;
    "secDescricao": string;
}

interface filtros {
    "modalidade" ?: Array<number>;
    "tipo" ?: Array<number>;
    "searchString" ?: string;
    "page" ?: number;
    "per_page" ?: number;
}

export default function Home() {
    const [atualiza, setAtualiza] = useState(0);  
    const [modalidades, setModalidades] = useState<Array<ModServices>>([]);
    const [tipos, setTipos] = useState<Array<TipServices>>([]);
    const [servicos, setServicos] = useState<Array<ServicesProps>>([]);
    
    const [showOptions, setShowOptions] = useState(false);

    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [pages, setPages] = useState(0);
    const [pagDefault, setPagDefault] = useState(0);
    const countPag = 0 as number;
    const perPageDefault = 12;
    const [newpage, setNewPage] = useState(0);

    const [clicked, setClicked] = useState(false);
    const handleToggle = () => {
        setClicked((prev) => !prev);
    };

    const [clickedTip, setClickedTip] = useState(false);
    const handleToggleTip = () => {
        setClickedTip((prev) => !prev);
    };

    const [ids, setIds] = useState<Array<number>>([]);
    const [idsMod, setIdsMod] = useState<Array<number>>([]);
    const [idsTip, setIdsTip] = useState<Array<number>>([]);
    const [search, setSearch] = useState('');

    const testeJson:filtros = {
        modalidade: [],
        tipo: [],        
        searchString: "",
        page: 1,
        per_page: 12
    }    

    useEffect(() => {   
        delete testeJson.modalidade;
        delete testeJson.tipo;        
        delete testeJson.searchString;
        delete testeJson.page;
        testeJson.page = 1;
        delete testeJson.per_page;
        testeJson.per_page = perPageDefault;

        console.log(testeJson);

        axios({
            method: 'post',    
            url: `http://localhost:3333/servicos`,
            data: testeJson,
        }).then(function(response) {
            setServicos(response.data.servicos)
            setPages(response.data.pagination.lastPage);
        }).catch(function(error) {
            console.log(error)
        })
      
        api.get("/modalidades").then(res => {
            setModalidades(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    
     
        api.get("/tipos").then(res => {
            setTipos(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        }); 
        setAtualiza(1);      
    }, [])

    useEffect(() => {      
        if(atualiza === 1) {
            if (idsMod.length > 0 ) {
                testeJson.modalidade = [...idsMod]
            }else {
                delete testeJson.modalidade;
            }
            if (idsTip.length > 0 ) {
                testeJson.tipo = [...idsTip]
            }else {
                delete testeJson.tipo;
            }        
            if (search !== "") {
                testeJson.searchString = search;
            }else {
                delete testeJson.searchString;                
            }
            let paramsData = JSON.stringify(testeJson);

            //setCurrentPage(1);
        
            delete testeJson.page;
            testeJson.page = 1;
            delete testeJson.per_page;
            testeJson.per_page = perPageDefault;

            console.log(testeJson);

            axios({
                method: 'post',    
                url: `http://localhost:3333/servicos`,
                data: testeJson,
            }).then(function(response) {
                setServicos(response.data.servicos)
                setPages(response.data.pagination.lastPage) 
            }).catch(function(error) {
                console.log(error)
            })              
        }    
    }, [idsMod, idsTip, search])

    useEffect(() => {      
        if(newpage === 1) {
            if (idsMod.length > 0 ) {
                testeJson.modalidade = [...idsMod]
            }else {
                delete testeJson.modalidade;
            }
            if (idsTip.length > 0 ) {
                testeJson.tipo = [...idsTip]
            }else {
                delete testeJson.tipo;
            }
            if (search !== "") {
                testeJson.searchString = search;
            }else {
                delete testeJson.searchString;                
            }
            delete testeJson.page;
            testeJson.page = currentPage;
            delete testeJson.per_page;
            testeJson.per_page = perPageDefault;

            console.log('CurrentPage:',testeJson);

            axios({
                method: 'post',    
                url: `http://localhost:3333/servicos`,
                data: testeJson,
            }).then(function(response) {
                setServicos(response.data.servicos)
            }).catch(function(error) {
                console.log(error)
            })              
        }    
    }, [currentPage ])


    const [filModalidades, setFilModalidades] = useState([]); 

    const selectModalidade = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = parseInt(event.target.value) as any;
        if (idsMod.includes(selectedId)) {
            const newIds = idsMod.filter((id:any) => id !== selectedId);
            setIds(newIds);
            setIdsMod(newIds);
            setFilModalidades(selectedId);
        } else {
            const newIds = [...idsMod];
            newIds.push(selectedId);
            setIds(newIds);      
            setIdsMod(newIds);
            setFilModalidades(selectedId);
        }
    };

    const [filTipos, setFilTipos] = useState([]); 

    const selectTipo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    if (idsTip.includes(selectedId)) {
        const newIds = idsTip.filter((id) => id !== selectedId);
        setIds(newIds);
        setIdsTip(newIds);
    } else {
        const newIds = [...idsTip];
        newIds.push(selectedId);
        setIds(newIds);
        setIdsTip(newIds);
        }   
    };

    function handleSearch() {
        setAtualiza(1);
    }
    
    const handleClick = () => {
        setShowOptions(!showOptions);      
    };

    return (
        <div className='w-full h-auto z-30'>
            <div className='flex flex-col md:flex-row w-full h-auto z-30'>
                <div className='bg-gray-300 w-full md:w-[25%] h-auto z-10'>
                    <span className="text-green-700 text-base font-semibold ml-3">
                        Filtro de Serviços
                    </span>
                    <div className='w-72 ml-3 mt-0 mb-3 z-40'>
                        <div>
                            <li className={`accordion_item ${clicked ? "active mb-2" : ""} list-none`}>
                                <button className="button p-2 text-green-700 font-bold text-left bg-gray-200 dark:bg-gray-800 border-l-2 border-gray-400 hover:cursor-pointertext-left flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg" onClick={handleToggle}>
                                    Modalidades
                                    <span className="control">{clicked ? "—" : "+"} </span>
                                </button>
                                <div className={`answer_wrapper ${clicked ? "active h-auto p-2 mb-5 bg-gray-200 dark:bg-gray-800 border-l-2 border-gray-400" : "hidden"}`}> 
                                    <div className={`answer ${clicked ? "active" : "hidden"}` }>
                                        <div className="h-auto">
                                            {modalidades.map((item) => (
                                            <div key={item.msvId} className='flex flex-row justify-between items-center w-64'>
                                                <span className="text-sm font-semibold">{item.msvDescricao}</span>
                                                <input
                                                    className="cursor-pointer"
                                                    type="checkbox"
                                                    value={item.msvId}
                                                    onChange={selectModalidade}
                                                    checked={idsMod.includes(item.msvId) ? true : false}
                                                />
                                            </div>
                                            ))}
                                        </div>  
                                    </div>
                                </div>
                            </li>                                
                        </div>
                    </div>
                    <div className='w-72 ml-3 mt-0 mb-3 z-40'>
                        <div>
                            <li className={`accordion_item ${clickedTip ? "active mb-2" : ""} list-none`}>
                                <button className="button p-2 text-green-700 font-bold text-left bg-gray-200 dark:bg-gray-800 border-l-2 border-gray-400 hover:cursor-pointertext-left flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg" onClick={handleToggleTip}>
                                    Tipos de Serviços
                                    <span className="control">{clickedTip ? "—" : "+"} </span>
                                </button>
                                <div className={`answer_wrapper ${clickedTip ? "active h-auto p-2 mb-5 bg-gray-200 dark:bg-gray-800 border-l-2 border-gray-400" : "hidden"}`}> 
                                    <div className={`answer ${clickedTip ? "active" : "hidden"}` }>
                                        <div className="h-auto">
                                            {tipos.map((item) => (
                                            <div key={item.tsvId} className='flex flex-row justify-between items-center w-64'>
                                                <span className="text-sm font-semibold">{item.tsvDescricao}</span>
                                                <input
                                                    className="cursor-pointer"
                                                    type="checkbox"
                                                    value={item.tsvId}
                                                    onChange={selectTipo}
                                                    checked={idsTip.includes(item.tsvId) ? true : false}
                                                />
                                            </div>
                                            ))}
                                        </div>  
                                    </div>
                                </div>
                            </li>                                
                        </div>
                    </div>
                </div>
                <div className='flex flex-col bg-gray-400 w-full justify-center md:w-[75%] h-auto'>
                    <div className='flex items-center justify-center md:w-full p-2'>
                        <div className='flex flex-row justify-start items-center w-full'>
                            <input type="search" 
                                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none" 
                                placeholder="Busca" 
                                aria-label="Search" 
                                aria-describedby="button-addon3" 
                                value={search} 
                                onChange={(e) => {setSearch(e.target.value)}} />
                            <button 
                                className="btn inline-block px-6 py-2 border-1 border-green-600 text-white font-medium text-xs leading-tight uppercase rounded-r-lg bg-green-700 hover:bg-green-400 hover:text-black transition duration-150 ease-in-out" 
                                onClick={handleSearch}
                                type="button" 
                                id="button-search">
                                <FaSearch className="w-4 h-5 rounded-r-lg"/>
                            </button>
                        </div>
                    </div>
                    <div className='flex bg-gray-500 w-full h-auto '>
                        <div className='flex flex-row justify-between items-center w-full text-black p-2 bg-[#F3F3F3] dark:bg-gray-800'> 
                            <div className='w-full h-auto mr-2 dark:bg-[#F3F3F3] '> 
                                <div className='flex flex-col w-full h-full text-black'>
                                    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 ml-1 px-0 py-0 ">            
                                    {servicos?.map((item:any, idx) => {
                                        return <Link key={idx} href={"/"}>
                                        <div className='bg-white mt-1 mb-3 rounded overflow-hidden shadow-lg hover:bg-[#008C3D]/40'> 
                                            <div className="flex flex-row items-start px-2 py-0 mt-1 ">
                                                <div className="flex w-auto h-auto bg-green-600 rounded-full items-start p-2">
                                                    <FaCogs className="w-6 h-6 text-white"/>
                                                </div>
                                                <div className="flex flex-col items-start px-2 py-1">
                                                    <div className="text-base font-bold mb-0">{item.srvDescricao}</div>
                                                </div>                                  
                                            </div>
                                            <div className="flex flex-row items-start justify-between px-2 py-0 ">
                                                <div className="flex flex-col items-start px-2 py-1">
                                                    <span className='text-[12px] font-bold'>ID</span>
                                                    <div className="text-[12px] mb-0">{item.srvId}</div>
                                                </div> 
                                                <div className="flex flex-col items-start px-2 py-1 ">
                                                    <span className='text-[12px] font-bold'>Secretaria</span>
                                                    <div className="text-[12px] mb-0">
                                                        {item.secDescricao}
                                                    </div>
                                                </div>
                                            </div>                                                                   
                                            <div className="flex flex-row items-start justify-between px-2 ">
                                                <div className="flex flex-col items-start px-2 py-2">
                                                    <span className='text-[12px] font-bold'>Objetivo</span>
                                                    <div className="text-[12px] mb-0">{item.srvObjetivo}</div>
                                                </div>                
                                            </div>
                                        </div>                                                            
                                    </Link>                  
                                    })}
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between items-center w-full text-black p-2 bg-gray-300 border-t-2 border-gray-200 '> 
                                    <div className='w-64 h-auto mr-5 md:w-80 md:mr-10 '>                                 
                                    </div>
                                    <div className='flex flex-row w-auto text-black p-2 bg-gray-300'>
                                        <Pagination pages={pages} setCurrentPage={setCurrentPage} setNewPage={setNewPage} pagInitial={pagDefault} /> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}

