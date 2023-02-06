import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import FormError from '../common/FormError'
import { displayCommentsError } from '../common/ErrorMessages'
import { commentError } from '../common/ErrorMessages'

const schema = yup.object().shape({
    body: yup.string().required('Please write your comment.'),
})

function CommentSection() {
    const [submitting, setSubmitting] = useState(false)
    const [displayError, setDisplayError] = useState(null)
    const [postError, setPostError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)
    const [comments, setComments] = useState([])

    const {
        register,
        handleSubmit,
        reset,
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
    const postFilter = '?_author=true&_comments=true&_reactions=true'

    const getUrl = BASE_URL + socialPosts + '/' + id + postFilter

    const postUrl = BASE_URL + socialPosts + '/' + id + '/comment'

    useEffect(function () {
        async function displayComments() {
            setDisplayError(null)

            try {
                const response = await axios(getUrl, options)
                console.log(response.data)
                setComments(response.data.comments)
            } catch (error) {
                console.log(error)
                const errorMessage = error.response.data.errors[0].message
                setDisplayError(errorMessage)
            }
        }
        displayComments()
    }, [])

    async function onSubmit(data) {
        setSubmitting(true)
        setPostError(null)

        try {
            const response = await axios.post(postUrl, data, options)
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
            {displayError && (
                <FormError>
                    <div>
                        <p>{displayCommentsError}</p>
                        <p>Error message: {displayError}</p>
                    </div>
                </FormError>
            )}
            {comments.map(function (comment) {
                return (
                    <div
                        key={comment.id}
                        className={`comment ${
                            comment.replyToId ? 'reply' : ''
                        }`}
                    >
                        <Link to={`/users/${comment.author.name}`}>
                            <img
                                src={comment.author.avatar}
                                className="avatar-image"
                                alt=""
                            />
                            <p className="username">{comment.author.name}</p>
                            <p>{comment.updated}</p>
                        </Link>
                        <p>{comment.body}</p>
                    </div>
                )
            })}
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
