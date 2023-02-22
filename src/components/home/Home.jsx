import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import useAxios from '../../hooks/useAxios'
import { socialPosts, postFlags } from '../../constants/api/api'
import Loader from '../common/Loader'
import Logo from '../layout/Logo'
import AuthorInfo from '../postElements/AuthorInfo'
import PostBody from '../postElements/PostBody'
import ReactionInfo from '../postElements/ReactionInfo'
import ErrorComponent from '../common/ErrorComponent'
import { feedError } from '../common/ErrorMessages'

/**
 * This is the Home component that displays the main feed.
 * It gets a list of posts from the API and displays them as cards. It also renders:
 * - The AuthorInfo component, which displays author information. It links to the author's profile.
 * - The PostBody component, which displays each post's content. It links to a page where the single post is displayed with comments and reactions.
 * - The ReactionInfo component, which displays each post's number of reactions and comments.
 */

function Home() {
    // Setting up useStates to handle the API result, the loading, and any errors.
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Using the Axios instance and setting up the URL endpoints.
    const http = useAxios()
    const endpoint = socialPosts + postFlags

    // Making the get request, setting the result as the value of posts, and the error as the value of error. Setting loading to false.
    useEffect(function () {
        async function getPosts() {
            setError(null)
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

    // Rendering the loader on page load.
    if (loading) {
        return <Loader />
    }

    // Rendering a custom error message if error.
    if (error) {
        return <ErrorComponent>{feedError}</ErrorComponent>
    }

    // Rendering the list of posts.
    return (
        <>
            <Logo headingLevel="h1">Charlie</Logo>
            <Container>
                {posts.map(function (post) {
                    return (
                        <Card key={post.id}>
                            <Link to={`/users/${post.author.name}`}>
                                <AuthorInfo data={post} />
                            </Link>
                            <Link to={`detail/${post.id}`}>
                                <PostBody data={post} />
                                <ReactionInfo data={post} />
                            </Link>
                        </Card>
                    )
                })}
            </Container>
        </>
    )
}

export default Home
