import React from 'react'
import LoginForm from './LoginForm'
import { RetrieveFromStorage } from '../common/LocalStorage'
import Heading from '../layout/Heading'

function NewUserLogin() {
    const userInfo = RetrieveFromStorage('userInfo')

    console.log(userInfo)

    return (
        <div>
            <Heading headingLevel="h1">Charlie</Heading>
            <p>Success, {userInfo.name}!</p>
            <p>You can now login to you new Charlie account:</p>
            <LoginForm />
        </div>
    )
}

export default NewUserLogin
