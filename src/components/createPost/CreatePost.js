import React from 'react'
import Heading from '../layout/Heading'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { createPostError } from '../common/ErrorMessages'
import AuthContext from '../../context/AuthContext'
import { urlMessage } from '../common/FormMessages'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormError from '../common/FormError'

const url = BASE_URL + socialPosts

const schema = yup.object().shape({
    title: yup.string().required('Please enter a post title.'),
    body: yup.string(),
    // media: yup.string().matches(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'Please enter a valid url.'),
})

function CreatePost() {
    const [submitting, setSubmitting] = useState(false)
    const [postError, setPostError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }

    async function onSubmit(data) {
        setSubmitting(true)
        setPostError(null)

        console.log(data)

        try {
            const response = await axios.post(url, data, options)
            console.log(response.data)
            navigate('/')
        } catch (error) {
            console.log(error.response.data)
            const errorMessage = error.response.data.errors[0].message
            setPostError(errorMessage.toString())
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <Heading headingLevel="h1">Create Post</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                {postError && (
                    <FormError>
                        <div>
                            <p>{createPostError}</p>
                            <p>Error message: {postError}</p>
                        </div>
                    </FormError>
                )}
                <fieldset disabled={submitting}>
                    <input {...register('title')} placeholder="Post Title" />
                    {errors.title && (
                        <FormError>{errors.title.message}</FormError>
                    )}
                    <textarea
                        {...register('body')}
                        placeholder="Post Text..."
                    />
                    <input {...register('media')} placeholder="Image URL" />
                    {errors.media && (
                        <FormError>{errors.media.message}</FormError>
                    )}
                    <p>{urlMessage}</p>
                    <button>{submitting ? 'Publishing...' : 'Publish'}</button>
                </fieldset>
            </form>
        </div>
    )
}

export default CreatePost
