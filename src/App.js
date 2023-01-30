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
import Profile from './components/profile/Profile'
import SinglePost from './components/home/SinglePost'
import SingleUser from './components/users/SingleUser'


import './App.css'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navigation />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<Users />} />{' '}
                        <Route path="/post" element={<CreatePost />} />{' '}
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/register/login" element={<NewUserLogin />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/detail/:id" element={<SinglePost />} />
                        <Route path="/users/:name" element={<SingleUser />} />
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    )
}

export default App
