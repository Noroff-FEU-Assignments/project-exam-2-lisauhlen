import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialUsers } from '../../constants/api/api'
import Heading from '../layout/Heading'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { singleUserError } from '../common/ErrorMessages'
import AuthContext from '../../context/AuthContext'

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

    const url = BASE_URL + socialUsers + '/' + auth.name + "/posts/" + postFilter

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
        return <ErrorComponent>
            {/* {singleUserPostsError} */}
            An error occurred!
            </ErrorComponent>
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
                        <img src={auth.avatar} alt="" />
                        <p>{auth.name}</p>
                        <p>{post.updated}</p>
                    </div>
                    <img src={post.media} alt="" />
                    <Heading headingLevel="h2">{post.title}</Heading>
                    <p>{post.body}</p>
                    <div>
                        <p>Comments: {post._count.comments}</p>
                        <p>❤️ {post._count.reactions}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default ProfilePosts