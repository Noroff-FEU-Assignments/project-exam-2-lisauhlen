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
    // Using useContext to handle authentication.
    const [auth, setAuth] = useContext(AuthContext)

    // Declaring the useNavigate hook.
    const navigate = useNavigate()

    function loggingOut() {
        // Make user confirm the logout.
        const confirmLogout = window.confirm('Are you sure you wanna logout?')

        // Auth is set to null, navigate to the login screen.
        if (confirmLogout) {
            setAuth(null)
            navigate('/')
        }
    }

    // Rendering the logout icon.
    return (
        <div onClick={loggingOut} className="logout-button">
            <Image src={logoutIcon} alt="logout icon" />
            <p>Logout</p>
        </div>
    )
}

export default Logout
