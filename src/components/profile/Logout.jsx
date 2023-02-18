import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import AuthContext from '../../context/AuthContext'
import logoutIcon from '../../images/logoutIcon.svg'

/**
 * This is the Logout component, which allows the user to logout from the App.
 * On click, it sets the auth variable to null, which nulls out the user info in Local Storage.
 * Then it navigates to the Login page, at '/'.
 */

function Logout() {
    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate()

    function loggingOut() {
        const confirmLogout = window.confirm('Are you sure you wanna logout?')

        if (confirmLogout) {
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