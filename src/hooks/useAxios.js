import { useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { BASE_URL } from '../constants/api/api'

// const url = process.env.REACT_APP_BASE_URL;

export default function useAxios() {
    const [auth] = useContext(AuthContext)

    const apiClient = axios.create({
        baseURL: BASE_URL,
    })

    apiClient.interceptors.request.use(function (config) {
        const token = auth.accessToken
        config.headers.Authorization = token ? `Bearer ${token}` : ''
        return config
    })

    return apiClient
}
