import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { socialUsers, postFlags } from '../../constants/api/api'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { profilePostError } from '../common/ErrorMessages'
import AuthContext from '../../context/AuthContext'
import PostMenu from '../postElements/PostMenu'
import avatarFeed from '../../images/avatarFeed.svg'
import PostBody from '../postElements/PostBody'
import ReactionInfo from '../postElements/ReactionInfo'
import AuthorInfo from '../postElements/AuthorInfo'
import Card from 'react-bootstrap/Card'

function ProfilePosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const http = useAxios()
    const endpoint = socialUsers + '/' + auth.name + '/posts/' + postFlags

    useEffect(function () {
        async function getPosts() {
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
        getPosts()
    }, [])

    let avatarImage = auth.avatar

    if (!avatarImage) {
        avatarImage = avatarFeed
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{profilePostError}</ErrorComponent>
    }

    if (posts.length === 0) {
        return (
            <div>
                <p>You haven't posted anything yet.</p>
                <Link to={`../post`}>Create your first post.</Link>
            </div>
        )
    }

    return (
        <div>
            {posts.map(function (post) {
                return (
                    <Card key={post.id}>
                        <AuthorInfo data={post} />
                        <Card.Body className="post-menu">
                            <PostMenu postId={post.id} />
                        </Card.Body>
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
