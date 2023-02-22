import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { BASE_URL, login } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import Loader from '../common/Loader'
import FormError from '../common/FormError'
import { userLoginError } from '../common/ErrorMessages'

/**
 * This is the Login form.
 * The form inputs are validated with Yup.
 * On submit, the data is sent to the API.
 * On success, the response is saved in the auth variable, which saves the response in Local Storage through useContext.
 */

// Validating all form inputs with Yup.
const schema = yup.object().shape({
    email: yup.string().required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
})

function Login() {
    // Setting up useStates to handle the form submit, and any errors. Using useContext to handle authentication.
    const [submitting, setSubmitting] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    // Declaring the useNavigate hook.
    const navigate = useNavigate()

    // Constructing the URL for the API call.
    const url = BASE_URL + login

    // Declaring register, handleSubmit, and errors for the form.
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    // This function runs on submit.
    async function onSubmit(data) {
        setSubmitting(true)
        setLoginError(null)

        // Making the post request to login. On success, result is set as the value of auth, and navigate home.
        // Setting error as the value of postError, and submitting to false.
        try {
            const response = await axios.post(url, data)
            setAuth(response.data)
            navigate('/home')
        } catch (error) {
            console.log(error)
            setLoginError(error.toString())
        } finally {
            setSubmitting(false)
        }
    }

    // Rendering the loader on form submit.
    if (submitting) {
        return <Loader />
    }

    // Rendering the login form.
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loginError && <FormError>{userLoginError}</FormError>}
            <fieldset disabled={submitting}>
                <input
                    {...register('email')}
                    placeholder="Email"
                    className="form-input"
                />
                {errors.email && <FormError>{errors.email.message}</FormError>}
                <input
                    {...register('password')}
                    placeholder="Password"
                    type="password"
                    className="form-input"
                />
                {errors.password && (
                    <FormError>{errors.password.message}</FormError>
                )}
                <button className="btn btn-primary">
                    {submitting ? 'Logging in...' : 'Login'}
                </button>
            </fieldset>
        </form>
    )
}

export default Login
