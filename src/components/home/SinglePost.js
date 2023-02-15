import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import useAxios from '../../hooks/useAxios'
import { socialPosts, postFlags } from '../../constants/api/api'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { singlePostError } from '../common/ErrorMessages'
import AuthContext from '../../context/AuthContext'
import PostMenu from '../postElements/PostMenu'
import CommentSection from '../postElements/CommentSection'
import AddReaction from '../postElements/AddReaction'
import PostBody from '../postElements/PostBody'
import AuthorInfo from '../postElements/AuthorInfo'
import Card from 'react-bootstrap/Card'

function SinglePost() {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const http = useAxios()
    let navigate = useNavigate()
    const { id } = useParams()

    if (!id) {
        navigate('/home')
    }

    const endpoint = socialPosts + '/' + id + postFlags

    useEffect(function () {
        async function getPost() {
            try {
                const response = await http.get(endpoint)
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
    }, [])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{singlePostError}</ErrorComponent>
    }

    return (
        <Container>
            <Card>
                <Link to={`/users/${post.author.name}`}>
                    <AuthorInfo data={post} /> 
                </Link>
                <div className={
                        post.author.name === auth.name ? 'post-menu' : 'hide-menu'
                    } >
                    <PostMenu postId={post.id} />
                </div>
                <PostBody data={post} />
                <Card.Body>
                    <p className={`${post.tags ? 'hide' : 'tags'}`}>{post.tags.join(', ')}</p>
                    <AddReaction data={post} />
                </Card.Body>
                <CommentSection data={post} />
            </Card>
        </Container>
    )
}

export default SinglePost
