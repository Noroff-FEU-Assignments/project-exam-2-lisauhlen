import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { BASE_URL, login } from '../../constants/api/api'
import FormError from '../common/FormError'
import { userLoginError } from '../common/ErrorMessages'
import AuthContext from '../../context/AuthContext'
import Loader from '../common/Loader'

const schema = yup.object().shape({
    email: yup.string().required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
})

function Login() {
    const [submitting, setSubmitting] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate()
    const url = BASE_URL + login

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    async function onSubmit(data) {
        setSubmitting(true)
        setLoginError(null)

        try {
            const response = await axios.post(url, data)
            console.log(response.data)
            setAuth(response.data)
            navigate('/home')
        } catch (error) {
            console.log(error)
            setLoginError(error.toString())
        } finally {
            setSubmitting(false)
        }
    }

    if (submitting) {
        return <Loader />
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {loginError && (
                    <FormError>
                        <p>{userLoginError}</p>
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
            <p>Don’t miss out on the fun!</p>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login
