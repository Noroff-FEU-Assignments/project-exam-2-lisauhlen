import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { BASE_URL, login } from '../../constants/api/api'
import FormError from '../common/FormError'
import AuthContext from '../../context/AuthContext'

const schema = yup.object().shape({
    email: yup.string().required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
})

function Login() {
    const [submitting, setSubmitting] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const url = BASE_URL + login

    async function onSubmit(data) {
        setSubmitting(true)
        setLoginError(null)

        console.log(data)
        console.log(url)

        try {
            const response = await axios.post(url, data)
            console.log(response.data)
            setAuth(response.data)
            navigate('/')
        } catch (error) {
            console.log(error)
            const errorMessage = error.response.data.errors[0].message
            setLoginError(errorMessage.toString())
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            Login
            <div>
                <p>lisuhlen@stud.noroff.no</p>
                <p>Hi5dFg4NgasDf</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {loginError && (
                    <FormError>
                        <div>
                            <p>
                                An error occurred. If it continues, please try
                                again later.
                            </p>
                            <p>Error message: {loginError}</p>
                        </div>
                    </FormError>
                )}
                <fieldset disabled={submitting}>
                    <input {...register('email')} placeholder="Email" />
                    {errors.email && (
                        <FormError>{errors.email.message}</FormError>
                    )}
                    <input
                        {...register('password')}
                        placeholder="Password"
                        type="password"
                    />
                    {errors.password && (
                        <FormError>{errors.password.message}</FormError>
                    )}
                    <button>{submitting ? 'Logging in...' : 'Login'}</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Login
