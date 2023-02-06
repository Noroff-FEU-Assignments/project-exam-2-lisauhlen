import React from 'react'
import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

function Logout() {
    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate()

    function loggingOut() {
        console.log('Logging out!')
        setAuth(null)
        navigate('/')
    }

    return <Button onClick={loggingOut}>Logout</Button>
}

export default Logout
