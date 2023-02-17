import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { AuthProvider } from './context/AuthContext'
import Navigation from './components/layout/Navigation'
import Register from './components/authentication/Register'
import NewUserLogin from './components/authentication/NewUserLogin'
import Login from './components/authentication/Login'
import Home from './components/home/Home'
import Users from './components/users/Users'
import CreatePost from './components/createPost/CreatePost'
import EditPost from './components/createPost/EditPost'
import Profile from './components/profile/Profile'
import SinglePost from './components/home/SinglePost'
import SingleUser from './components/users/SingleUser'
import './sass/style.scss'

import './App.scss'
import AvatarBannerUpdate from './components/profile/AvatarBannerUpdate'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container fluid className="nav-container">
                    <Navigation />
                </Container>
                <Container fluid className="app-container">
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/users" element={<Users />} />{' '}
                        <Route path="/post" element={<CreatePost />} />{' '}
                        <Route path="/post/:id" element={<EditPost />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                            path="/profile/update-images"
                            element={<AvatarBannerUpdate />}
                        />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/register/login"
                            element={<NewUserLogin />}
                        />
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/home/detail/:id"
                            element={<SinglePost />}
                        />
                        <Route path="/users/:name" element={<SingleUser />} />
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    )
}

export default App
