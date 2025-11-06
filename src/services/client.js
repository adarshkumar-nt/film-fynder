import axios from "axios";

const myAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_OMDB_BASE_URL
})

export default myAxios;