
import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT,
    headers:{
        'Content-Type': 'application/json',
    },
})

export default instance