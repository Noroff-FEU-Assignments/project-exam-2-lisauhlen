import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { socialUsers } from '../../constants/api/api'
import Heading from '../layout/Heading'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { singleUserPostsError } from '../common/ErrorMessages'
import { feedFilter } from '../home/Home'
import AvatarImage from '../postElements/AvatarImage'
import PostBody from '../postElements/PostBody'

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

    const endpoint = socialUsers + '/' + name + '/posts/' + feedFilter

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
                            <AvatarImage data={post} />
                            <p>{post.author.name}</p>
                            <p>{post.updated}</p>
                        </div>
                        <Link to={`../../home/detail/${post.id}`}>
                            <PostBody data={post} />
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

export default SingleUserPosts
