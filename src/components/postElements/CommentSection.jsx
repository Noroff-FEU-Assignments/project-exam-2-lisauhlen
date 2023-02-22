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

// Validating the form input with Yup.
const schema = yup.object().shape({
    body: yup.string().required('Please write your comment.'),
})

function NewCommentSection(post) {
    // Setting up useStates to handle the API result, form submit and any errors.
    // Setting the post.data.comments as the value of comments.
    const [comments, setComments] = useState(post.data.comments)
    const [submitting, setSubmitting] = useState(false)
    const [postError, setPostError] = useState(null)

    // Declaring the Axios instance.
    const http = useAxios()

    // Getting id from the URL, and creating the URL for the API call.
    const { id } = useParams()
    const endpoint = socialPosts + '/' + id + '/comment'

    // Declaring Day.js for date formatting.
    const dayjs = require('dayjs')

    // Declaring register, handleSubmit, reset, and errors for the post form.
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    // This function runs on submit.
    async function onSubmit(data) {
        setSubmitting(true)
        setPostError(null)

        // Making the post request. On success, result is set as the value of comments, and form is reset.
        // Setting error as the value of postError, and submitting to false.
        try {
            const response = await http.post(endpoint, data)
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

    // Rendering all post comments and the comment form where the user can post a comment.
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
