import React from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAxios from '../../hooks/useAxios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { socialPosts } from '../../constants/api/api'
import FormError from '../common/FormError'
import { commentError } from '../common/ErrorMessages'
import AvatarImage from './AvatarImage'

const schema = yup.object().shape({
    body: yup.string().required('Please write your comment.'),
})

function NewCommentSection(post) {
    const [comments, setComments] = useState(post.data.comments)
    const [submitting, setSubmitting] = useState(false)
    const [postError, setPostError] = useState(null)

    const http = useAxios()
    const { id } = useParams()
    const endpoint = socialPosts + '/' + id + '/comment'

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    async function onSubmit(data) {
        setSubmitting(true)
        setPostError(null)

        try {
            const response = await http.post(endpoint, data)
            console.log(response.data)
            const newComment = response.data
            setComments([...comments, newComment])
            reset()
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
            <b>NewCommentSection:</b>
            {comments.map(function (comment) {
                return (
                    <div
                        key={comment.id}
                        className={`comment ${
                            comment.replyToId ? 'reply' : ''
                        }`}
                    >
                        <Link to={`/users/${comment.author.name}`}>
                            <AvatarImage data={comment} />
                            <p className="username">{comment.author.name}</p>
                            <p>{comment.updated}</p>
                        </Link>
                        <p>{comment.body}</p>
                    </div>
                )
            })}
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={submitting}>
                    <textarea
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

export default NewCommentSection
