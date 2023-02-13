import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { socialUsers, postFlags } from '../../constants/api/api'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { singleUserPostsError } from '../common/ErrorMessages'
import AvatarImage from '../postElements/AvatarImage'
import PostBody from '../postElements/PostBody'
import CountReactions from '../postElements/CountReactions'
import AuthorInfo from '../postElements/AuthorInfo'
import ReactionInfo from '../postElements/ReactionInfo'

function SingleUserPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const http = useAxios()
    let navigate = useNavigate()
    const { name } = useParams()

    if (!name) {
        navigate('/')
    }

    const endpoint = socialUsers + '/' + name + '/posts/' + postFlags

    useEffect(
        function () {
            async function getUserPosts() {
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
            getUserPosts()
        },
        []
    )

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{singleUserPostsError}</ErrorComponent>
    }

    if (posts.length === 0) {
        return (
            <div>
                <p>This user hasn't posted anything yet.</p>
            </div>
        )
    }

    return (
        <div>
            {posts.map(function (post) {
                return (
                    <div key={post.id}>
                        <div>
                            {/* <AvatarImage data={post} />
                            <p>{post.author.name}</p>
                            <p>{post.updated}</p> */}
                            <AuthorInfo data={post} />
                        </div>
                        <Link to={`../../home/detail/${post.id}`}>
                            <PostBody data={post} />
                            <ReactionInfo data={post} />
                            {/* <div>
                                <p>Comments: {post._count.comments}</p>
                                <CountReactions data={post.reactions} />
                            </div> */}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default SingleUserPosts
