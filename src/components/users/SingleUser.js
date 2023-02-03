import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialUsers } from '../../constants/api/api'
import Heading from '../layout/Heading'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { singleUserError } from '../common/ErrorMessages'
import SingleUserPosts from './SingleUserPosts'
import AuthContext from '../../context/AuthContext'
import FollowUnfollowUser from './FollowUnfollowUser'

const postFilter = '?limit=40&_followers=true&_following=true'

function SingleUser() {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }

    let navigate = useNavigate()

    const { name } = useParams()

    if (!name) {
        navigate('/')
    }

    const url = BASE_URL + socialUsers + '/' + name + postFilter

    useEffect(
        function () {
            async function getUser() {
                try {
                    const response = await axios(url, options)
                    console.log(response.data)
                    setUser(response.data)
                } catch (error) {
                    console.log(error)
                    setError(error.toString())
                } finally {
                    setLoading(false)
                }
            }
            getUser()
        },
        [url]
    )

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{singleUserError}</ErrorComponent>
    }

    return (
        <div>
            <Heading headingLevel="h1">{user.name}</Heading>
            <div>
                <img src={user.banner} alt="" />
                <img src={user.avatar} alt="" />
                <p>{user.name}</p>
                <div>
                    <FollowUnfollowUser data={user.followers} />
                    <p>{user.following.length} Following</p>
                    {/* <p>{user.followers.length} Followers</p> */}
                </div>
            </div>
            <div>
                <SingleUserPosts />
            </div>
        </div>
    )
}

export default SingleUser
