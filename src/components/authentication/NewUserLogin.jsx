import React from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import { RetrieveFromStorage } from '../common/LocalStorage'
import Logo from '../layout/Logo'
import Heading from '../layout/Heading'
import LoginForm from './LoginForm'
import decorTop from '../../images/decorTop.svg'
import decorBottom from '../../images/decorBottom.svg'

/**
 * This is the Login page for new users.
 * It welcomes the new user with the username saved in Local Storage.
 * It renders the LoginForm.
 */

function NewUserLogin() {
    // Getting the user info from Local Storage, to welcome the user by username.
    const userInfo = RetrieveFromStorage('userInfo')

    return (
        <div className="position-relative login-screens">
            <Image src={decorTop} alt="" className="decor-top" />
            <Logo headingLevel="h1" className="logo">
                Charlie
            </Logo>
            <div className="welcome-message">
                <Heading headingLevel="h2">Success, {userInfo.name}</Heading>
                <p>You can now login to you new Charlie account:</p>
            </div>
            <Container className="login-form">
                <LoginForm />
            </Container>
            <Image src={decorBottom} alt="" className="decor-bottom" />
        </div>
    )
}

export default NewUserLogin
