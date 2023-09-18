import React, { useState, useEffect } from "react";
import { FaBars } from 'react-icons/fa';
import axios from "axios";
import Link from "next/link";

const DropLicitacoes = () => {
  const [showOptions, setShowOptions] = useState(false);

  const [contador, setContador] = useState([]);

  const handleClick = () => {
      setShowOptions(!showOptions);      
  };

  useEffect(() => {      
        let urlListagem = `https://webio.aparecida.go.gov.br/api/lict/modalidades/contador`;
        axios({ 
            method : "get" , 
            url : `https://webio.aparecida.go.gov.br/api/lict/modalidades/contador` , 
        }).then ((resposta) => {
            setContador(resposta.data);
        });
  }, [])


  return (
    <div>
      <button onClick={handleClick} id="dropdownButton" data-dropdown-toggle="dropdown" type="button" name="btnDropDown"
        className="z-5 hover:text-white hover:bg-green-700 font-medium rounded-full text-black text-sm ml-2 px-3 py-3 text-center inline-flex items-center"> 
        <FaBars className="w-4 h-4"/>
      </button>
      {showOptions && (
        <div className="z-10 origin-top-left absolute left-1 md:origin-top-right md:absolute md:right-0 mt-2 w-64 rounded-md shadow-lg bg-gray-200 text-green-700 font-bold dark:bg-gray-900 ring-1 ring-black dark:ring-white ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
          <div className="py-1" role="none">
            {contador && 
              contador.map((option: any) => (
                <div key={option.id} className="flex flex-row justify-between items-center w-full hover:bg-gray-100 hover:text-black">  
                    <Link href={`/licitacoes/${option.id}`} passHref >
                        <span className=" dark:text-white w-52 block px-4 py-2 text-sm dark:hover:text-black" role="menuitem" id="menu-item-0" tabIndex={option.id} >
                            {option.nome} 
                        </span>                          
                    </Link> 
                    <span className="mr-3 ">{option.registros}</span> 
                </div> 
              ))}
          </div>
            </div>
      )}
    </div>  
  );
};

export default DropLicitacoes;