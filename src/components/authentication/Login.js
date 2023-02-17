import React from 'react'
import { useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import AuthContext from '../../context/AuthContext'
import Logo from '../layout/Logo'
import LoginForm from './LoginForm'
import decorTop from '../../images/decorTop.svg'
import decorBottom from '../../images/decorBottom.svg'

function Login() {
    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(function () {
        if (auth) {
            navigate('/home')
        }
    }, [])

    return (
        <div className="position-relative login-screens">
            <Image src={decorTop} alt="" className="decor-top" />
            <Logo headingLevel="h1" className="logo">
                Charlie
            </Logo>
            <Container className="login-form">
                <LoginForm />
                <div className="change-form">
                    <p>Don’t miss out on the fun!</p>
                    <Link to="/register">Register</Link>
                </div>
            </Container>
            <Image src={decorBottom} alt="" className="decor-bottom" />
        </div>
    )
}

export default Login
