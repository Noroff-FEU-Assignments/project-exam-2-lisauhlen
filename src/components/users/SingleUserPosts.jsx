import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import useAxios from '../../hooks/useAxios'
import { socialUsers, postFlags } from '../../constants/api/api'
import Loader from '../common/Loader'
import AuthorInfo from '../postElements/AuthorInfo'
import PostBody from '../postElements/PostBody'
import ReactionInfo from '../postElements/ReactionInfo'
import ErrorComponent from '../common/ErrorComponent'
import { singleUserPostsError } from '../common/ErrorMessages'

/**
 * This is the Single User Posts component, which displays all posts made by the single user.
 * It gets the user's posts from the API and displays them in Cards by rendering the following components:
 * - AuthorInfo, which displays the post's author details.
 * - PostBody, which displays the post content.
 * - ReactionInfo, which displays the comment and reaction count.
 */

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

    useEffect(function () {
        async function getUserPosts() {
            try {
                const response = await http.get(endpoint)
                setPosts(response.data)
            } catch (error) {
                console.log(error)
                setError(error.toString())
            } finally {
                setLoading(false)
            }
        }
        getUserPosts()
    }, []) // eslint-disable-line

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{singleUserPostsError}</ErrorComponent>
    }

    if (posts.length === 0) {
        return (
            <div className="no-posts">
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
