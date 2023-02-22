import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import useAxios from '../../hooks/useAxios'
import { socialPosts } from '../../constants/api/api'
import BackButton from '../common/BackButton'
import Heading from '../layout/Heading'
import AuthContext from '../../context/AuthContext'
import FormError from '../common/FormError'
import { createPostError } from '../common/ErrorMessages'
import { urlMessage } from '../common/FormMessages'
import avatarFeed from '../../images/avatarFeed.svg'

/**
 * This is the Create Post component that lets the user create a post.
 * The post form is validated with Yup.
 * On submit, the post data is sent to the API.
 * On success, the user is navigated to '/home' to see their new post in the feed.
 */

// Validating all form inputs with Yup.
const schema = yup.object().shape({
    title: yup.string().required('Please enter a post title.'),
    body: yup
        .string()
        .max(280, 'The post text can not be longer than 280 characters.'),
    tags: yup.string(),
    media: yup
        .string()
        .matches(
            /[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&=]*)|^$/,
            'Please enter a valid url.'
        ),
})

function CreatePost() {
    // Setting up useStates to handle the form submit, and any errors. Using useContext to handle authentication.
    const [submitting, setSubmitting] = useState(false)
    const [postError, setPostError] = useState(null)
    const [auth] = useContext(AuthContext)

    // Declaring the Axios instance, and the useNavigate hook.
    const http = useAxios()
    const navigate = useNavigate()

    // Declaring register, handleSubmit, and errors for the post form.
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
        setPostError(null)

        // Checking for post tags and formatting them correctly.
        if (data.tags) {
            data.tags = data.tags
                .split(' ')
                .join(',')
                .split(',,')
                .join(',')
                .split(',')
        } else {
            data.tags = ['']
        }

        // Making the post request. On success, navigate home to see the new post.
        // Setting error as the value of postError, and submitting to false.
        try {
            await http.post(socialPosts, data)
            navigate('/home')
        } catch (error) {
            console.log(error.response.data)
            setPostError(error.toString())
        } finally {
            setSubmitting(false)
        }
    }

    // Checking for avatar image. If no avatar, a default image is set.
    let avatarImage = auth.avatar
    if (!avatarImage) {
        avatarImage = avatarFeed
    }

    // Rendering the post form.
    return (
        <Container className="position-relative">
            <BackButton data="close" />
            <Heading headingLevel="h1">Create Post</Heading>
            <Card>
                <Card.Body className="author-info">
                    <Image
                        src={avatarImage}
                        roundedCircle
                        className="author-avatar"
                        alt=""
                    />
                    <p className="username">{auth.name}</p>
                </Card.Body>
                <Card.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {postError && <FormError>{createPostError}</FormError>}
                        <fieldset disabled={submitting}>
                            <input
                                {...register('title')}
                                placeholder="Post Title"
                                className="form-input title-input"
                            />
                            {errors.title && (
                                <FormError>{errors.title.message}</FormError>
                            )}
                            <textarea
                                {...register('body')}
                                placeholder="Post Text..."
                                className="form-input"
                            />
                            {errors.body && (
                                <FormError>{errors.body.message}</FormError>
                            )}
                            <input
                                {...register('tags')}
                                placeholder="Post tags"
                                className="form-input"
                            />
                            <input
                                {...register('media')}
                                placeholder="Image URL"
                                className="form-input"
                            />
                            {errors.media && (
                                <FormError>{errors.media.message}</FormError>
                            )}
                            <p className="url-message">{urlMessage}</p>
                            <button className="btn btn-primary">
                                {submitting ? 'Publishing...' : 'Publish'}
                            </button>
                        </fieldset>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default CreatePost
