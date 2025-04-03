import axios from "axios";

const API_URL =  "https://jsonplaceholder.typicode.com/users" ; 

export const getUsers = async()=>{
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }catch(error){
        console.log("Api hatasi", error);
        return [];
    }
}