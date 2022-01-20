import React, { useEffect, useContext } from "react";
import { useState } from "react/cjs/react.development";
import { AuthContext } from "../../contexts/auth";

import { getUsers } from "../../services/api";


const HomePage = () => {

    const{ authenticated, logout } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [loadig, setLoading] = useState(true)

    useEffect(() => { //não pode usar async dentro do useEffect
        (async () => {
            const response = await getUsers()
            setUsers(response.data)
            setLoading(false)
        })()
    }, [])

    const handleLogout = () => {
        logout();
    }

    if(loadig){
        <div className="loading">Carregando dados</div>
    }


    return (
        <>
            <h1>Homepage</h1>
            <p>{String(authenticated)}</p>
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {
                    users.map((user)=> (
                      <li key={user._id}>
                          {user._id} - {user.email}
                      </li>  
                    ))
                }
            </ul>
        </>
        ) 
        
}

export default HomePage