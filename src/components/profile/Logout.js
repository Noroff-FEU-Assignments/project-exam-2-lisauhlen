import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import AuthContext from '../../context/AuthContext'
import logoutIcon from '../../images/logoutIcon.svg'

function Logout() {
    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate()

    function loggingOut() {
        const confirmLogout = window.confirm('Are you sure you wanna logout?')

        if (confirmLogout) {
            console.log('Logging out!')
            setAuth(null)
            navigate('/')
        }
    }

    return (
        <div onClick={loggingOut} className="logout-button">
            <Image src={logoutIcon} alt="logout icon" />
            <p>Logout</p>
        </div>
    )
}

export default Logout
