import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { singlePostError } from '../common/ErrorMessages'
import Heading from '../layout/Heading'
import AuthContext from '../../context/AuthContext'
import PostMenu from '../postElements/PostMenu'
import WriteComment from '../postElements/WriteComment'
import ReactToPost from '../postElements/ReactToPost'

const postFilter = '?_author=true&_comments=true&_reactions=true'

function SinglePost() {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }

    let navigate = useNavigate()

    const { id } = useParams()

    if (!id) {
        navigate('/home')
    }

    const url = BASE_URL + socialPosts + '/' + id + postFilter

    useEffect(function () {
        async function getPost() {
            try {
                const response = await axios(url, options)
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
        <div>
            <div>
                <img src={post.author.avatar} className="avatar-image" alt="" />
                <p>{post.author.name}</p>
                <p>{post.updated}</p>
            </div>
            <div
                className={
                    post.author.name === auth.name ? 'post-menu' : 'hide-menu'
                }
            >
                <PostMenu postId={post.id} />
            </div>
            <img src={post.media} alt="" />
            <Heading headingLevel="h2">{post.title}</Heading>
            <p>{post.body}</p>
            {/* <div>
                {post.comments.map(function (comment) {
                    return (
                        <div
                            key={comment.id}
                            className={`comment ${
                                comment.replyToId ? 'reply' : ''
                            }`}
                        >
                            <div>
                                <img
                                    src={comment.author.avatar}
                                    className="avatar-image"
                                    alt=""
                                />
                                <p className="username">
                                    {comment.author.name}
                                </p>
                                <p>{comment.updated}</p>
                            </div>
                            <p>{comment.body}</p>
                        </div>
                    )
                })}
            </div> */}
            <div>
                {/* <InteractionSection url={url}/> */}
                <ReactToPost data={[post.reactions]} />
                <WriteComment />
            </div>
        </div>
    )
}

export default SinglePost
