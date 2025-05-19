import axios from "axios";


const baseUrl = 'http://localhost:3001/persons'



 const createEntry = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const getAllPerson = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}




export default {createEntry, getAllPerson}