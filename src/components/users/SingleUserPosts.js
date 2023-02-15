import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { socialUsers, postFlags } from '../../constants/api/api'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { singleUserPostsError } from '../common/ErrorMessages'
import PostBody from '../postElements/PostBody'
import AuthorInfo from '../postElements/AuthorInfo'
import ReactionInfo from '../postElements/ReactionInfo'
import Card from 'react-bootstrap/Card'

function SingleUserPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const http = useAxios()
    let navigate = useNavigate()
    const { name } = useParams()

    if (!name) {
        navigate('/')
    }

    const endpoint = socialUsers + '/' + name + '/posts/' + postFlags

    useEffect(
        function () {
            async function getUserPosts() {
                try {
                    const response = await http.get(endpoint)
                    console.log(response.data)
                    setPosts(response.data)
                } catch (error) {
                    console.log(error)
                    setError(error.toString())
                } finally {
                    setLoading(false)
                }
            }
            getUserPosts()
        },
        []
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
                    <Card key={post.id}>
                            <AuthorInfo data={post} />
                        <Link to={`../../home/detail/${post.id}`}>
                            <PostBody data={post} />
                            <ReactionInfo data={post} />
                        </Link>
                    </Card>
                )
            })}
        </div>
    )
}

export default SingleUserPosts
