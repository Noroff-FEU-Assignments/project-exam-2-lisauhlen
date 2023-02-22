import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import useAxios from '../../hooks/useAxios'
import { socialUsers, postFlags } from '../../constants/api/api'
import Loader from '../common/Loader'
import AuthContext from '../../context/AuthContext'
import PostMenu from '../postElements/PostMenu'
import AuthorInfo from '../postElements/AuthorInfo'
import PostBody from '../postElements/PostBody'
import ReactionInfo from '../postElements/ReactionInfo'
import ErrorComponent from '../common/ErrorComponent'
import { profilePostError } from '../common/ErrorMessages'

/**
 * This is the Profile Posts component.
 * It gets the user's own posts from the API and displays them in Cards by rendering the following components:
 * - AuthorInfo, which displays the post's author details.
 * - PostMenu, which allows the post owner to edit or delete the post.
 * - PostBody, which displays the post content.
 * - ReactionInfo, which displays the comment and reaction count.
 */

function ProfilePosts() {
    // Setting up useStates to handle the result, loading, and any errors. Using useContext to handle authentication.
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth] = useContext(AuthContext)

    // Declaring the Axios instance and creating the URL.
    const http = useAxios()
    const endpoint = socialUsers + '/' + auth.name + '/posts/' + postFlags

    // Making the get request. On success, result is set as the value of posts.
    // Setting error as the value of error, and loading to false.
    useEffect(function () {
        async function getPosts() {
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
        getPosts()
    }, []) // eslint-disable-line

    // Rendering the loader if loading.
    if (loading) {
        return <Loader />
    }

    // Rendering a custom error message if error.
    if (error) {
        return <ErrorComponent>{profilePostError}</ErrorComponent>
    }

    // Displaying a message if no posts.
    if (posts.length === 0) {
        return (
            <div className="no-posts">
                <p>You haven't posted anything yet.</p>
                <Link to={`../post`}>Create your first post.</Link>
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
                        <PostMenu postId={post.id} />
                        <Link to={`/home/detail/${post.id}`}>
                            <PostBody data={post} />
                            <ReactionInfo data={post} />
                        </Link>
                    </Card>
                )
            })}
        </div>
    )
}

export default ProfilePosts
