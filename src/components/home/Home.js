import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import useAxios from '../../hooks/useAxios'
import { socialPosts, postFlags } from '../../constants/api/api'
import Logo from '../layout/Logo'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { feedError } from '../common/ErrorMessages'
import AuthorInfo from '../postElements/AuthorInfo'
import PostBody from '../postElements/PostBody'
import ReactionInfo from '../postElements/ReactionInfo'
import Card from 'react-bootstrap/Card'

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
