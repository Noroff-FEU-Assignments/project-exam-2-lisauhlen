import React from 'react'
import Login from './Login'
import { RetrieveFromStorage } from '../common/LocalStorage'

function NewUserLogin() {
    const userInfo = RetrieveFromStorage('userInfo')

    console.log(userInfo)

    return (
        <div>
            <p>Success, {userInfo.name}!</p>
            <p>You can now login to you new Charlie account:</p>
            <Login />
        </div>
    )
}

export default NewUserLogin
