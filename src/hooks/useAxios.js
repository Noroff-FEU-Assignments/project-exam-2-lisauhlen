import { useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { BASE_URL } from '../constants/api/api'

/**
 * This is the axios Instance.
 * It holds the Base Url, and gets the Access Token from the auth variable.
 */

export default function useAxios() {
    // Using useContext to handle authentication.
    const [auth] = useContext(AuthContext)

    // Setting up the base url.
    const apiClient = axios.create({
        baseURL: BASE_URL,
    })

    // Setting up the request headers.
    apiClient.interceptors.request.use(function (config) {
        const token = auth.accessToken
        config.headers.Authorization = token ? `Bearer ${token}` : ''
        return config
    })

    return apiClient
}
