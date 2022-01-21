import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

// import { getUsers } from "../../services/api";

import Nav from "./Nav"
import Search from "./Search"
import Repositories from "./Repositories"

import {getRepositories, createRepository, deleteRepository} from "../../services/api"

import "./style.css"

const userId = '61e9dd0755fd4987879347fa'

const HomePage = () => {

    
    const {user, logout} = useContext(AuthContext)
    const [repositories, setRepositories] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingError, setLoadingError] = useState(false)

    const loadData = async (query = '') => {
        
        try {
            // console.log(query +  '-> Query' )
            const response = await getRepositories(user?.id, query)
            setRepositories(response.data)  
            setLoading(false) 
        } catch (err) {
            console.error(err)
            setLoadingError(true)
        }

        
    }
    
    useEffect(() => { //não pode usar async dentro do useEffect
        (async () => await loadData())()
    }, [])
    
    const handleLogout = () => {
        logout();
        console.log('Logout')

    }
    
    const hadleSearch = (query) => {
        if(!query){
            console.log('Busca vazia')
            loadData(query)
        }
            
        // console.log(query)
        loadData(query)

    }

    
    const handleDeleteRepo = async (repository) => {
        try{
            await deleteRepository(user?.id, repository._id)
            await loadData()
        }catch(err){
            console.error(err)
            setLoadingError(true)
        }
    }

    const handleNewRepo = async (url) => {
        // console.log(url)
        try{
            await createRepository(user?.id, url)
            await loadData()
        }catch(err){
            console.error(err)
            setLoadingError(true)
        }
    }

    if(loadingError){
       return <div className="loading">Erro ao carregar dados <Link to="/login">Voltar</Link></div> 
    }

    if(loading){
        return <div className="loading">Carregando dados</div>

    }

    return(
        <div id="main">
            <p>{user.email}</p>
            <Nav onLogout={handleLogout} />

            <Search onSearch={hadleSearch} />

            <Repositories
                repositories={repositories}
                onDeleteRepo={handleDeleteRepo}
                onNewRepo={handleNewRepo}
            />

            
        </div>
        
        )
}

    
    export default HomePage
