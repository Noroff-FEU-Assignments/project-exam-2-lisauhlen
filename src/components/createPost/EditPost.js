import React from 'react'
import Heading from '../layout/Heading'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialPosts } from '../../constants/api/api'
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
    body: yup.string(),
    // media: yup.string().matches(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'Please enter a valid url.'),
})

function EditPost() {
    const [submitting, setSubmitting] = useState(false)
    const [displayError, setDisplayError] = useState(null)
    const [editError, setEditError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)
    const [value, setValue] = useState([])

    const navigate = useNavigate()

    const { id } = useParams()

    const url = BASE_URL + socialPosts + '/' + id

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

    useEffect(
        function () {
            async function defaultValues() {
                try {
                    const response = await axios(url, options)
                    console.log(response.data)
                    setValue(response.data)
                } catch (error) {
                    console.log(error)
                    const errorMessage = error.response.data.errors[0].message
                    setDisplayError(errorMessage.toString())
                }
            }
            defaultValues()
        },
        // [url]
        []
    )

    let title = value.title
    let body = value.body
    let media = value.media

    async function onSubmit(data) {
        setSubmitting(true)
        setEditError(null)

        if (data.title) {
            title = data.title
        }

        if (data.body) {
            body = data.body
        }

        if (data.media) {
            media = data.media
        }

        const newData = {
            title: title,
            body: body,
            media: media,
        }

        try {
            const response = await axios.put(url, newData, options)
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
