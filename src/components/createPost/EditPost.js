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
import AuthContext from '../../context/AuthContext'
import { socialPosts } from '../../constants/api/api'
import ErrorComponent from '../common/ErrorComponent'
import Heading from '../layout/Heading'
import FormError from '../common/FormError'
import { singlePostError, editPostError } from '../common/ErrorMessages'
import { urlMessage } from '../common/FormMessages'
import avatarFeed from '../../images/avatarFeed.svg'

const schema = yup.object().shape({
    title: yup.string().required('Please enter a post title.'),
    body: yup
        .string()
        .max(280, 'The post text can not be longer than 280 characters.'),
    tags: yup.string(),
    media: yup
        .string()
        .matches(
            /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|^$/,
            'Please enter a valid url.'
        ),
})

function EditPost() {
    const [submitting, setSubmitting] = useState(false)
    const [displayError, setDisplayError] = useState(null)
    const [editError, setEditError] = useState(null)
    const [value, setValue] = useState([])
    const [auth] = useContext(AuthContext)

    const http = useAxios()
    const navigate = useNavigate()
    const { id } = useParams()
    const endpoint = socialPosts + '/' + id

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(function () {
        async function defaultValues() {
            try {
                const response = await http.get(endpoint)
                console.log(response.data)
                setValue(response.data)
                reset()
            } catch (error) {
                console.log(error)
                setDisplayError(error.toString())
            }
        }
        defaultValues()
    }, [])

    let title = value.title
    let body = value.body
    let tags = value.tags
    let media = value.media

    async function onSubmit(data) {
        setSubmitting(true)
        setEditError(null)

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

        const newData = {
            title: title,
            body: data.body,
            tags: tags,
            media: media,
        }

        console.log(newData)

        console.log(data)

        try {
            const response = await http.put(endpoint, data)
            console.log(response.data)
            navigate('/home')
        } catch (error) {
            console.log(error)
            setEditError(error.toString())
        } finally {
            setSubmitting(false)
        }
    }

    if (displayError) {
        return (
            <ErrorComponent>
                <p>{singlePostError}</p>
            </ErrorComponent>
        )
    }

    let avatarImage = auth.avatar

    if (!avatarImage) {
        avatarImage = avatarFeed
    }

    return (
        <Container>
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
                                {submitting ? 'Publishing...' : 'Publish'}
                            </button>
                        </fieldset>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default EditPost
