import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { BASE_URL, registerUser } from '../../constants/api/api'
import FormError from '../common/FormError'
import Heading from '../layout/Heading'
import Loader from '../common/Loader'
import { SaveToStorage } from '../common/LocalStorage'

const schema = yup.object().shape({
    name: yup
        .string()
        .required('Please enter a username')
        .min(1, 'The username must contain at least one character.'),
    email: yup
        .string()
        .required('Please enter your email')
        .matches(
            /^[\w-.]+@(?:[\w-]+.?)?noroff.no$/,
            'The email must be a noroff.no address'
        ),
    password: yup
        .string()
        .required('Please enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            'The password must have minimum eight characters, and contain at least one uppercase letter, one lowercase letter and one number.'
        ),
})

function Register() {
    const [submitting, setSubmitting] = useState(false)
    const [loginError, setLoginError] = useState(null)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const url = BASE_URL + registerUser

    async function onSubmit(data) {
        setSubmitting(true)
        setLoginError(null)

        console.log(data)
        console.log(url)

        try {
            const response = await axios.post(url, data)
            console.log(response.data)
            SaveToStorage('userInfo', response.data)
            navigate('/register/login')
        } catch (error) {
            console.log(error)
            const errorMessage = error.response.data.errors[0].message
            setLoginError(errorMessage.toString())
        } finally {
            setSubmitting(false)
        }
    }

    if (submitting) {
        return <Loader />
    }

    return (
        <div>
            <Heading headingLevel="h1">Charlie</Heading>
            <p>Welcome!</p>
            <div>
                <p>lisa</p>
                <p>lisrys24380@stud.noroff.no</p>
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
                <fieldset>
                    <input
                        {...register('name')}
                        placeholder="Choose a username"
                    />
                    {errors.name && (
                        <FormError>{errors.name.message}</FormError>
                    )}
                    <input
                        {...register('email')}
                        placeholder="Enter your email address"
                    />
                    {errors.email && (
                        <FormError>{errors.email.message}</FormError>
                    )}
                    <input
                        {...register('password')}
                        placeholder="Choose a strong password"
                        type="password"
                    />
                    {errors.password && (
                        <FormError>{errors.password.message}</FormError>
                    )}
                    <button>
                        {submitting ? 'Registering...' : 'Register'}
                    </button>
                </fieldset>
            </form>
            <p>Already have a user?</p>
            <Link to="/">Login</Link>
        </div>
    )
}

export default Register
