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
    // Setting up useStates to handle the result, loading, and any errors.
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Declaring the Axios instance and the useNavigate hook.
    const http = useAxios()
    let navigate = useNavigate()

    // Getting name from the URL. If no name, navigate to home.
    const { name } = useParams()

    if (!name) {
        navigate('/home')
    }

    // Creating the URL for the API call.
    const endpoint = socialUsers + '/' + name + '/posts/' + postFlags

    // Making the get request. On success, result is set as the value of posts.
    // Setting error as the value of error, and loading to false.
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

    // Rendering the loader if loading.
    if (loading) {
        return <Loader />
    }

    // Rendering a custom error message if error.
    if (error) {
        return <ErrorComponent>{singleUserPostsError}</ErrorComponent>
    }

    // Displaying a message if no posts.
    if (posts.length === 0) {
        return (
            <div className="no-posts">
                <p>This user hasn't posted anything yet.</p>
            </div>
        )
    }

    // Rendering the user's posts.
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
