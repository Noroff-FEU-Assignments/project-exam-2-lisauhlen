import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import Heading from '../layout/Heading'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { feedError } from '../common/ErrorMessages'
import AuthContext from '../../context/AuthContext'
import PostMenu from '../postElements/PostMenu'
import CountReactions from '../postElements/CountReactions'
import commentsIcon from '../../images/commentsIcon.svg'
import AvatarImage from '../postElements/AvatarImage'
import PostBody from '../postElements/PostBody'

export const feedFilter =
    '?limit=40&_author=true&_reactions=true&_comments=true'

const url = BASE_URL + socialPosts + feedFilter

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }

    useEffect(function () {
        async function getPosts() {
            setError(null)

            try {
                const response = await axios(url, options)
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
        <div>
            <Heading headingLevel="h1">Charlie</Heading>
            {posts.map(function (post) {
                let avatar = post.author.avatar

                if (!avatar) {
                    avatar =
                        'https://res.cloudinary.com/lisaur/image/upload/v1675421845/PE2/avatar-default_kbh9mo.svg'
                }

                return (
                    <div key={post.id}>
                        <Link to={`/users/${post.author.name}`}>
                            {/* <img
                                // src={post.author.avatar}
                                src={avatar}
                                className="avatar-image"
                                alt=""
                            /> */}
                            <AvatarImage data={post} />
                            <p className="username">{post.author.name}</p>
                            <p>{post.updated}</p>
                        </Link>
                        {/* <div
                            className={
                                post.author.name === auth.name
                                    ? 'post-menu'
                                    : 'hide-menu'
                            }
                        >
                            <PostMenu postId={post.id} />
                        </div> */}
                        <Link to={`detail/${post.id}`}>
                            <PostBody data={post} />
                            <div>
                                <span>
                                    <img
                                        src={commentsIcon}
                                        alt="Comments icon"
                                    />{' '}
                                    {post._count.comments}
                                </span>
                                <CountReactions data={post.reactions} />
                            </div>
                        </Link>
                        {/* <Link to={`detail/${post.id}`}>
                            <img src={post.media} alt="" />
                            <Heading headingLevel="h2">{post.title}</Heading>
                            <p>{post.body}</p>
                            <div>
                                <span><img src={commentsIcon} alt="Comments icon" /> {post._count.comments}</span>
                                <CountReactions data={post.reactions} />
                            </div>
                        </Link> */}
                    </div>
                )
            })}
        </div>
    )
}

export default Home
