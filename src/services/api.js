import axios from "axios";

export const api = axios.create({
        baseURL: 'http://localhost:5000'
})

export const createSession = async (email, password) => {
    console.log(password)
    return api.post('/sessions', {email, password})
}

export const getUsers = async () => {
    return api.get('/users')
}

export const getRepositories = async (userId, query) => {
    
    // console.log(query +  '-> Query' )
    
    let url = `/users/${userId}/repositories/`
    
    if(query !== ''){
        url += `?q=${query}`
    }
    
    // console.log(url +  ' -> URL' )
    return api.get(url)
    
}

export const createRepository = async (userId, repositoryUrl) => {
    const repositoryName = getRepositoryName(repositoryUrl)

    const url = `/users/${userId}/repositories/`
    
    // console.log(userId +  ' -> userId' )

    return api.post(url, {name: repositoryName, url: repositoryUrl})
}

const getRepositoryName = (url) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

    const match = url.match(regex)

    
    if(match[2]){
        // console.log( match)
        const values = match[2].split('/')

        return `${values[1]}/${values[2]}`
    }
}

export const deleteRepository = async (userId, id) => {
    const url = `/users/${userId}/repositories/${id}`   
    return api.delete(url)
}