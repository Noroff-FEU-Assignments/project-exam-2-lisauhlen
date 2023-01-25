import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Home from './components/home/Home'
import Users from './components/users/Users'
import CreatePost from './components/createPost/CreatePost'
import Profile from './components/profile/Profile'
import SinglePost from './components/home/SinglePost'
import SingleUser from './components/users/SingleUser'

import './App.css'

function App() {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to="/" className="nav-link">
                            Feed
                        </NavLink>
                        <NavLink to="/users" className="nav-link">
                            Users
                        </NavLink>
                        <NavLink to="/post" className="nav-link">
                            Post
                        </NavLink>
                        <NavLink to="/profile" className="nav-link">
                            {' '}
                            Profile{' '}
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />{' '}
                    <Route path="/users" element={<Users />} />{' '}
                    <Route path="/post" element={<CreatePost />} />{' '}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/detail/:id" element={<SinglePost />} />
                    <Route path="/users/:name" element={<SingleUser />} />
                </Routes>
            </Container>
        </Router>
    )
}

export default App
