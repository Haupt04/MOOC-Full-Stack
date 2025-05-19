import axios from "axios";

// Completed 2.13 already

const baseUrl = 'http://localhost:3001/persons'



 const createEntry = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const getAllPerson = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

const updatePerson = (id, newPerson) => {
    const request = axios.put(`http://localhost:3001/persons/${id}`,newPerson)
    return request.then(response => response.data)
}



export default {createEntry, getAllPerson, deletePerson, updatePerson}