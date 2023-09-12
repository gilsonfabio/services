"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import qs from 'qs';

import api from './components/Services/api';
import { FaSearch } from 'react-icons/fa';

type ModServices = {
    "msvId": number;
    "msvDescricao": string;
}

type TipServices = {
    "tsvId": number;
    "tsvDescricao": string;
}

type ServicesProps = {
    "srvId": number;
    "srvDescricao": string;
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
        axios({
            method: 'post',    
            url: `https://webio.aparecida.go.gov.br/api/lict/v1/filtrar/licitacoes`,
            data: qs.stringify(testeJson),
        }).then(function(response) {
            setServicos(response.data.items)
            setPages(response.data.paginate.lastPage);
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
                url: `https://webio.aparecida.go.gov.br/api/lict/v1/filtrar/licitacoes`,
                data: qs.stringify(testeJson),
            }).then(function(response) {
                setServicos(response.data.items)
                setPages(response.data.paginate.lastPage) 
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
                url: `https://webio.aparecida.go.gov.br/api/lict/v1/filtrar/licitacoes`,
                data: qs.stringify(testeJson),
            }).then(function(response) {
                setServicos(response.data.items)
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

    return (
        <div className="flex flex-col justify-center ml-20 mr-20">
            <div className="flex justify-center w-full ">
                Bem-vindo ao portal de serviços
            </div>  
            <div className="flex flex-row h-full ">      
                <div className="flex flex-col w-[20%] h-screen bg-gray-300">
                    <span className="text-green-700 text-base font-semibold ml-3">
                        Filtro de Serviços
                    </span>
                    <div className='w-72 ml-3 mt-0 mb-3'>
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
                    <div className='w-72 ml-3 mt-0 mb-3'>
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
                <div className="flex flex-col items-center w-[80%] h-screen bg-gray-200">
                    <div className='w-[90%] mt-4'>
                        <div className='flex flex-row justify-start items-center'>
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
                </div>        
            </div>    
        </div>   
    )
}
