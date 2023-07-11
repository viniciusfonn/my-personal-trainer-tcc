import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://my-personal-trainer-api.up.railway.app'
})


