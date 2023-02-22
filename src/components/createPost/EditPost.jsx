import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import useAxios from '../../hooks/useAxios'
import { socialPosts } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import BackButton from '../common/BackButton'
import Heading from '../layout/Heading'
import { urlMessage } from '../common/FormMessages'
import ErrorComponent from '../common/ErrorComponent'
import FormError from '../common/FormError'
import { singlePostError, editPostError } from '../common/ErrorMessages'
import avatarFeed from '../../images/avatarFeed.svg'

/**
 * This is the Edit Post component where the user can edit their own post.
 * The form is populated with the post's current values.
 * On submit, the form data is sent to the API.
 * On success, the user is navigated to '/home/detail/:id' to see their edited post.
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

function EditPost() {
    // Setting up useStates to handle the form submit, any errors, and the get result.
    // Using useContext to handle authentication.
    const [submitting, setSubmitting] = useState(false)
    const [displayError, setDisplayError] = useState(null)
    const [editError, setEditError] = useState(null)
    const [value, setValue] = useState([])
    const [auth] = useContext(AuthContext)

    // Declaring the Axios instance, and the useNavigate hook.
    const http = useAxios()
    const navigate = useNavigate()

    // Getting id from the URL, and setting up the URL endpoints.
    const { id } = useParams()
    const endpoint = socialPosts + '/' + id

    // Declaring register, handleSubmit, reset, and errors for the post form.
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    // Getting the contents of the post we want to update. Setting the result as the value of value, and resetting.
    // Setting error as the value of displayError.
    useEffect(function () {
        async function defaultValues() {
            try {
                const response = await http.get(endpoint)
                setValue(response.data)
                reset()
            } catch (error) {
                console.log(error)
                setDisplayError(error.toString())
            }
        }
        defaultValues()
    }, []) // eslint-disable-line

    // Declaring variables holding the values of the post we're changing.
    let title = value.title
    let body = value.body
    let tags = value.tags
    let media = value.media

    // This function runs on submit.
    async function onSubmit(data) {
        setSubmitting(true)
        setEditError(null)

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

        // Making the put request. On success, navigate to the updated post.
        // Setting error as the value of editError, and submitting to false.
        try {
            await http.put(endpoint, data)
            navigate('/home/detail/' + id)
        } catch (error) {
            console.log(error)
            setEditError(error.toString())
        } finally {
            setSubmitting(false)
        }
    }

    // Rendering a custom error message if error.
    if (displayError) {
        return <ErrorComponent>{singlePostError}</ErrorComponent>
    }

    // Checking for avatar image. If no avatar, a default image is set.
    let avatarImage = auth.avatar
    if (!avatarImage) {
        avatarImage = avatarFeed
    }

    // Rendering the post form populated with the post's current values.
    return (
        <Container className="position-relative">
            <BackButton data="close" />
            <Heading headingLevel="h1">Edit Post</Heading>
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
                        {editError && <FormError>{editPostError}</FormError>}
                        <fieldset disabled={submitting}>
                            <input
                                {...register('title')}
                                defaultValue={title}
                                placeholder="Post Title"
                                className="form-input title-input"
                            />
                            {errors.title && (
                                <FormError>{errors.title.message}</FormError>
                            )}
                            <textarea
                                {...register('body')}
                                defaultValue={body}
                                placeholder="Post Text..."
                                className="form-input"
                            />
                            {errors.body && (
                                <FormError>{errors.body.message}</FormError>
                            )}
                            <input
                                {...register('tags')}
                                defaultValue={tags}
                                placeholder="Post tags"
                                className="form-input"
                            />
                            <input
                                {...register('media')}
                                defaultValue={media}
                                placeholder="Image URL"
                                className="form-input"
                            />
                            {errors.media && (
                                <FormError>{errors.media.message}</FormError>
                            )}
                            <p className="url-message">{urlMessage}</p>
                            <button className="btn btn-primary">
                                {submitting ? 'Updating...' : 'Update Post'}
                            </button>
                        </fieldset>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default EditPost
