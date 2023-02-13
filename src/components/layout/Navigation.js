import React from 'react'
import { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Login from '../authentication/Login'

function Navigation() {
    const [auth, setAuth] = useContext(AuthContext)

    return (
        <>
            {auth ? (
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to="/home" className="nav-link">
                                Feed
                            </NavLink>
                            <NavLink to="/users" className="nav-link">
                                Users
                            </NavLink>
                            <NavLink to="/post" className="nav-link">
                                Post
                            </NavLink>
                            <NavLink to="/profile/" className="nav-link">
                                {' '}
                                Profile{' '}
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            ) : (
                <></>
            )}
        </>
    )
}

export default Navigation
