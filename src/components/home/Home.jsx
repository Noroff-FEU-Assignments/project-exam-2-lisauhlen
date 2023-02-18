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
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const http = useAxios()
    const endpoint = socialPosts + postFlags

    useEffect(function () {
        async function getPosts() {
            setError(null)
            try {
                const response = await http.get(endpoint)
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
