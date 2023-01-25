import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialUsers } from '../../constants/api/api'
import Heading from '../layout/Heading'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { singleUserPostsError } from '../common/ErrorMessages'
import { feedFilter } from '../home/Home'

let token = null

function SingleUserPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    token = localStorage.getItem('token')

    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let navigate = useNavigate()

    const { name } = useParams()

    if (!name) {
        navigate('/')
    }

    const url = BASE_URL + socialUsers + '/' + name + '/posts/' + feedFilter

    useEffect(
        function () {
            async function getUser() {
                try {
                    const response = await axios(url, options)
                    console.log(response.data)
                    setPosts(response.data)
                } catch (error) {
                    console.log(error)
                    setError(error.toString())
                } finally {
                    setLoading(false)
                }
            }
            getUser()
        },
        [url]
    )

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{singleUserPostsError}</ErrorComponent>
    }

    if (posts.length === 0) {
        return (
            <div>
                <p>This user hasn't posted anything yet.</p>
            </div>
        )
    }

    return (
        <div>
            {posts.map(function (post) {
                return (
                    <Link to={`../../detail/${post.id}`} key={post.id}>
                        <div>
                            <img src={post.author.avatar} alt="" />
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

export default SingleUserPosts
