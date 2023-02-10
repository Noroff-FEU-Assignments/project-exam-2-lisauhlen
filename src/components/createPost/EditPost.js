import React from 'react'
import Heading from '../layout/Heading'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { socialPosts } from '../../constants/api/api'
import ErrorComponent from '../common/ErrorComponent'
import { singlePostError, editPostError } from '../common/ErrorMessages'
import AuthContext from '../../context/AuthContext'
import { urlMessage } from '../common/FormMessages'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormError from '../common/FormError'

const schema = yup.object().shape({
    title: yup.string().required('Please enter a post title.'),
    body: yup.string().max(280, 'The post text can not be longer than 280 characters.'),
    tags: yup.string(),
    // media: yup.string().matches(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'Please enter a valid url.'),
})

function EditPost() {
    const [submitting, setSubmitting] = useState(false)
    const [displayError, setDisplayError] = useState(null)
    const [editError, setEditError] = useState(null)
    const [value, setValue] = useState([])

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

    useEffect(
        function () {
            async function defaultValues() {
                try {
                    const response = await http.get(endpoint)
                    console.log(response.data)
                    setValue(response.data)
                    reset()
                } catch (error) {
                    console.log(error)
                    const errorMessage = error.response.data.errors[0].message
                    setDisplayError(errorMessage.toString())
                }
            }
            defaultValues()
        },
        []
    )

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
            const errorMessage = error.response.data.errors[0].message
            setEditError(errorMessage.toString())
        } finally {
            setSubmitting(false)
        }
    }

    if (displayError) {
        return (
            <ErrorComponent>
                <p>{singlePostError}</p>
                <p>Error message: {displayError}</p>
            </ErrorComponent>
        )
    }

    return (
        <div>
            <Heading headingLevel="h1">Edit Post</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                {editError && (
                    <FormError>
                        <div>
                            <p>{editPostError}</p>
                            <p>Error message: {editError}</p>
                        </div>
                    </FormError>
                )}
                <fieldset disabled={submitting}>
                    <input
                        {...register('title')}
                        defaultValue={title}
                        placeholder="Post Title"
                    />
                    {errors.title && (
                        <FormError>{errors.title.message}</FormError>
                    )}
                    <textarea
                        {...register('body')}
                        defaultValue={body}
                        placeholder="Post Text..."
                    />
                    {errors.body && (
                        <FormError>{errors.body.message}</FormError>
                    )}
                    <input
                        {...register('tags')}
                        defaultValue={tags}
                        placeholder="Post tags"
                    />
                    <input
                        {...register('media')}
                        defaultValue={media}
                        placeholder="Image URL"
                    />
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

export default EditPost
