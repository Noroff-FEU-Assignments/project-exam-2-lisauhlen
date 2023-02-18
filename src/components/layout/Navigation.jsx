import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import AuthContext from '../../context/AuthContext'
import FeedIcon from './menuIcons/FeedIcon'
import UsersIcon from './menuIcons/UsersIcon'
import PostIcon from './menuIcons/PostIcon'
import ProfileIcon from './menuIcons/ProfileIcon'

/**
 * This is the Navigation component, which is displayed to logged in users only.
 * It uses useContext to check if the user is logged in.
 */

function Navigation() {
    const [auth, setAuth] = useContext(AuthContext)

    return (
        <>
            {auth ? (
                <Navbar className="navigation">
                    <NavLink to="/home" className="nav-link">
                        <FeedIcon />
                        Feed
                    </NavLink>
                    <NavLink to="/users" className="nav-link">
                        <UsersIcon />
                        Users
                    </NavLink>
                    <NavLink to="/post" className="nav-link">
                        <PostIcon />
                        Post
                    </NavLink>
                    <NavLink to="/profile" className="nav-link">
                        <ProfileIcon />
                        Profile
                    </NavLink>
                </Navbar>
            ) : (
                <></>
            )}
        </>
    )
}

export default Navigation
