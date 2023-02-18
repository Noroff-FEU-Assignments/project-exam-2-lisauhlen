import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import { BASE_URL, registerUser } from '../../constants/api/api'
import Loader from '../common/Loader'
import Logo from '../layout/Logo'
import Heading from '../layout/Heading'
import { SaveToStorage } from '../common/LocalStorage'
import FormError from '../common/FormError'
import { userRegisterError } from '../common/ErrorMessages'
import decorTop from '../../images/decorTop.svg'
import decorBottom from '../../images/decorBottom.svg'

/**
 * This is the Registration form where new users can register (only 'stud.noroff.no' emails are accepted).
 * The form inputs are validated with Yup.
 * On submit, the API call is made to the server.
 * On success, the response is saved in Local Storage, and the user is navigated to 'register/login' where they can log in for the first time.
 */

const schema = yup.object().shape({
    name: yup
        .string()
        .required('Please enter a username')
        .min(1, 'The username must contain at least one character.'),
    email: yup
        .string()
        .required('Please enter your email')
        .matches(
            /^[\w!#$%&'*+\/=?^`{|}~.-]+@stud.noroff.no$/,
            'The email must be a stud.noroff.no address'
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
    const [registerError, setRegisterError] = useState(null)

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
        setRegisterError(null)

        try {
            const response = await axios.post(url, data)
            console.log(response.data)
            SaveToStorage('userInfo', response.data)
            navigate('/register/login')
        } catch (error) {
            console.log(error)
            setRegisterError(error)
        } finally {
            setSubmitting(false)
        }
    }

    if (submitting) {
        return <Loader />
    }

    return (
        <div className="position-relative login-screens">
            <Image src={decorTop} alt="" className="decor-top" />
            <Logo>Charlie</Logo>
            <Container className="login-form">
                <div className="welcome-message">
                    <Heading headingLevel="h2">Welcome!</Heading>
                    <p>Enter your information to register:</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {registerError && (
                        <FormError>{userRegisterError}</FormError>
                    )}
                    <fieldset>
                        <input
                            {...register('name')}
                            placeholder="Username"
                            className="form-input"
                        />
                        {errors.name && (
                            <FormError>{errors.name.message}</FormError>
                        )}
                        <input
                            {...register('email')}
                            placeholder="Email"
                            className="form-input"
                        />
                        {errors.email && (
                            <FormError>{errors.email.message}</FormError>
                        )}
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
                            {submitting ? 'Registering...' : 'Register'}
                        </button>
                    </fieldset>
                </form>
                <div className="change-form">
                    <p>Already have a user?</p>
                    <Link to="/">Login</Link>
                </div>
            </Container>
            <Image src={decorBottom} alt="" className="decor-bottom" />
        </div>
    )
}

export default Register
