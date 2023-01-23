import axios from "axios";

const token = window.localStorage.getItem("auth");

export const makeRequrestAsUser = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers:{
        Authorization: "Bearer " + token,
    }
})