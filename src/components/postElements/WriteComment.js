import React from 'react'
import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import FormError from '../common/FormError'
import { commentError } from '../common/ErrorMessages'

const schema = yup.object().shape({
    body: yup.string().required('Please write your comment.'),
})

function CommentSection() {
    const [submitting, setSubmitting] = useState(false)
    const [postError, setPostError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

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

    const { id } = useParams()

    const url = BASE_URL + socialPosts + '/' + id + '/comment'

    async function onSubmit(data) {
        setSubmitting(true)
        setPostError(null)

        console.log(data)
        console.log(url)

        try {
            const response = await axios.post(url, data, options)
            console.log(response)
            window.location.reload(false)
        } catch (error) {
            console.log(error)
            const errorMessage = error.response.data.errors[0].message
            setPostError(errorMessage)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <b>Comment section:</b>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={submitting}>
                    <input
                        {...register('body')}
                        placeholder="Share your thoughts..."
                    />
                    {errors.body && (
                        <FormError>{errors.body.message}</FormError>
                    )}
                    {postError && (
                        <FormError>
                            <div>
                                <p>{commentError}</p>
                                <p>Error message: {postError}</p>
                            </div>
                        </FormError>
                    )}
                    <button>{submitting ? 'Publishing...' : 'Publish'}</button>
                </fieldset>
            </form>
        </div>
    )
}

export default CommentSection
