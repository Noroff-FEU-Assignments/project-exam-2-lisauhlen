import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { singlePostError } from '../common/ErrorMessages'
import Heading from '../layout/Heading'

const postFilter = '?_author=true&_comments=true&_reactions=true'

let token = null

function SinglePost() {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    token = localStorage.getItem('token')

    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let navigate = useNavigate()

    const { id } = useParams()

    if (!id) {
        navigate('/')
    }

    const url = BASE_URL + socialPosts + '/' + id + postFilter

    useEffect(
        function () {
            async function getPost() {
                try {
                    const response = await axios(url, options)
                    console.log(response.data)
                    setPost(response.data)
                } catch (error) {
                    console.log(error)
                    setError(error.toString())
                } finally {
                    setLoading(false)
                }
            }
            getPost()
        },
        [url]
    )

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{singlePostError}</ErrorComponent>
    }

    return (
        <div>
            <div>
                <img src={post.author.avatar} className="avatar-image" />
                <p>{post.author.name}</p>
                <p>{post.updated}</p>
            </div>
            <img src={post.media} />
            <Heading headingLevel="h2">{post.title}</Heading>
            <p>{post.body}</p>
        </div>
    )
}

export default SinglePost
