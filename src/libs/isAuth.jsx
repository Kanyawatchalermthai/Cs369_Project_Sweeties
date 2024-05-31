import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const isAuth = () => {
    const author = axios.defaults.headers.common["Authorization"];
    const token = sessionStorage.getItem('token');
    if(!token) {
        return false;
    }
    try {
        const token = author.replace("Bearer ", "");
        jwtDecode(token);
        return true;
    } catch(e) {
        return false;
    }
}

export const getPayload = () => {
    const author = axios.defaults.headers.common["Authorization"];
    const token = author.replace("Bearer ", "");

    return jwtDecode(token);
}