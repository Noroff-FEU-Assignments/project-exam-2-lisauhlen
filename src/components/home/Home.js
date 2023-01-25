import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import Heading from '../layout/Heading'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { feedError } from '../common/ErrorMessages'

export const feedFilter =
    '?limit=40&_author=true&_reactions=true&_comments=true'

const url = BASE_URL + socialPosts + feedFilter

let token = null

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    token = localStorage.getItem('token')

    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    useEffect(function () {
        async function getPosts() {
            try {
                const response = await axios(url, options)
                console.log(response.data)
                setPosts(response.data)
            } catch (error) {
                setError(error.toString())
            } finally {
                setLoading(false)
            }
        }
        getPosts()
    }, [])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{feedError}</ErrorComponent>
    }

    return (
        <div>
            <Heading headingLevel="h1">Charlie</Heading>
            {posts.map(function (post) {
                return (
                    <Link to={`detail/${post.id}`} key={post.id}>
                        <div>
                            <img
                                src={post.author.avatar}
                                className="avatar-image"
                                alt=""
                            />
                            <p>{post.author.name}</p>
                            <p>{post.updated}</p>
                        </div>
                        <img src={post.media} alt="" />
                        <Heading headingLevel="h2">{post.title}</Heading>
                        <p>{post.body}</p>
                        <div>
                            <p>Comments: {post._count.comments}</p>
                            <p>❤️ {post._count.reactions}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Home
