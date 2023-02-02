import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialUsers } from '../../constants/api/api'
import Heading from '../layout/Heading'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { profilePostError } from '../common/ErrorMessages'
import AuthContext from '../../context/AuthContext'
import PostMenu from '../postElements/PostMenu'

const postFilter = '?limit=40&_followers=true&_following=true'

function ProfilePosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }

    const url =
        BASE_URL + socialUsers + '/' + auth.name + '/posts/' + postFilter

    useEffect(function () {
        async function getPosts() {
            try {
                const response = await axios(url, options)
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
                    <div key={post.id}>
                        <div>
                            <img
                                src={auth.avatar}
                                className="avatar-image"
                                alt=""
                            />
                            <p>{auth.name}</p>
                            <p>{post.updated}</p>
                        </div>
                        <div className="post-menu">
                            <PostMenu postId={post.id} />
                        </div>
                        <Link to={`../../detail/${post.id}`}>
                            <img src={post.media} alt="" />
                            <Heading headingLevel="h2">{post.title}</Heading>
                            <p>{post.body}</p>
                            <div>
                                <p>Comments: {post._count.comments}</p>
                                <p>❤️ {post._count.reactions}</p>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default ProfilePosts
