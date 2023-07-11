import axios, {AxiosInstance} from "axios";

export const api: AxiosInstance = axios.create({
	baseURL: 'https://my-personal-trainer-api.up.railway.app'
})
