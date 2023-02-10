import React from 'react'
import Heading from '../layout/Heading'
import { useState } from 'react'
import useAxios from '../../hooks/useAxios'
import { socialPosts } from '../../constants/api/api'
import { createPostError } from '../common/ErrorMessages'
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
    media: yup.string().matches(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|^$/, 'Please enter a valid url.'),
})

function CreatePost() {
    const [submitting, setSubmitting] = useState(false)
    const [postError, setPostError] = useState(null)

    const http = useAxios()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    async function onSubmit(data) {
        setSubmitting(true)
        setPostError(null)

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

        try {
            const response = await http.post(socialPosts, data)
            console.log(response.data)
            navigate('/home')
        } catch (error) {
            console.log(error.response.data)
            setPostError(error.toString())
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
                        <p>{createPostError}</p>
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
                    {errors.body && (
                        <FormError>{errors.body.message}</FormError>
                    )}
                    <input {...register('tags')} placeholder="Post tags" />
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
