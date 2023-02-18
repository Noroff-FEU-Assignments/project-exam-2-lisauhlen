import React from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from 'react-bootstrap/Card'
import useAxios from '../../hooks/useAxios'
import { socialPosts } from '../../constants/api/api'
import AvatarImage from './AvatarImage'
import FormError from '../common/FormError'
import { commentError } from '../common/ErrorMessages'

/**
 * This is the Comment Section component.
 * It displays all the post's comments and allows the user to post a comment through the form.
 * On submit, the form is validated with Yup.
 * On success, the comment section is updated with useState, and the new comment is displayed.
 */

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
    const dayjs = require('dayjs')

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
            setPostError(error.toString())
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <Card.Body className="comment-section">
                {comments.map(function (comment) {
                    const date = dayjs(comment.created).format('D. MMM YYYY')

                    return (
                        <div
                            key={comment.id}
                            className={`comment ${
                                comment.replyToId ? 'reply' : ''
                            }`}
                        >
                            <Link
                                to={`/users/${comment.author.name}`}
                                className="author-info"
                            >
                                <AvatarImage data={comment} />
                                <div>
                                    <p className="username">
                                        {comment.author.name}
                                    </p>
                                    <p className="date">{date}</p>
                                </div>
                            </Link>
                            {comment.body}
                        </div>
                    )
                })}
            </Card.Body>
            <form onSubmit={handleSubmit(onSubmit)} className="form-comment">
                <fieldset disabled={submitting} className="card-body">
                    <div className="flex-elements">
                        <textarea
                            {...register('body')}
                            placeholder="Share your thoughts..."
                        />
                        <button className="input-button">
                            {submitting ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                    {errors.body && (
                        <FormError>{errors.body.message}</FormError>
                    )}
                    {postError && <FormError>{commentError}</FormError>}
                </fieldset>
            </form>
        </div>
    )
}

export default NewCommentSection