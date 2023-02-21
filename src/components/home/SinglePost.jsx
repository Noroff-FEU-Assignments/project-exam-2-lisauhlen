import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import useAxios from '../../hooks/useAxios'
import { socialPosts, postFlags } from '../../constants/api/api'
import Loader from '../common/Loader'
import BackButton from '../common/BackButton'
import AuthContext from '../../context/AuthContext'
import AuthorInfo from '../postElements/AuthorInfo'
import PostMenu from '../postElements/PostMenu'
import PostBody from '../postElements/PostBody'
import AddReaction from '../postElements/AddReaction'
import CommentSection from '../postElements/CommentSection'
import ErrorComponent from '../common/ErrorComponent'
import { singlePostError } from '../common/ErrorMessages'

/**
 * This is the Single Post component that displays a single post by id. It also renders:
 * - The AuthorInfo component, which displays author information. It links to the author's profile.
 * - The PostMenu component. This is only displayed to the post's owner. It lets them edit or delete the post.
 * - The PostBody component, which displays each post's content.
 * - The AddReaction component, allowing the user to post a reaction and displays the post's number of reactions.
 * - The CommentSection, which displays the post's comments and allows the user to post a comment.
 */

function SinglePost() {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth] = useContext(AuthContext)

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
        <Container className="position-relative container-padding">
            <BackButton data="back" />
            <Card>
                <Link to={`/users/${post.author.name}`}>
                    <AuthorInfo data={post} />
                </Link>
                <div
                    className={
                        post.author.name === auth.name ? 'post-menu' : 'hide'
                    }
                >
                    <PostMenu postId={post.id} />
                </div>
                <PostBody data={post} />
                <Card.Body>
                    <p className={`${post.tags ? 'hide' : 'tags'}`}>
                        {post.tags.join(', ')}
                    </p>
                    <AddReaction data={post} />
                </Card.Body>
                <CommentSection data={post} />
            </Card>
        </Container>
    )
}

export default SinglePost
