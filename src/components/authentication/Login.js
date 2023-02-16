import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Heading from '../layout/Heading'
import LoginForm from './LoginForm'

function Login() {
    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(function () {
        if (auth) {
            navigate('/home')
        }
    }, [])

    return (
        <div>
            <Heading headingLevel="h1">Charlie</Heading>
            <div>
                <p>lisuhlen@stud.noroff.no</p>
                <p>Hi5dFg4NgasDf</p>
            </div>
            <LoginForm />
        </div>
    )
}

export default Login
