import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { socialUsers } from '../../constants/api/api'
import Heading from '../layout/Heading'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { singleUserError } from '../common/ErrorMessages'
import SingleUserPosts from './SingleUserPosts'
import FollowUnfollowUser from './FollowUnfollowUser'
import avatarProfile from '../../images/avatarProfile.svg'
import bannerProfile from '../../images/bannerProfile.svg'

const postFilter = '?limit=40&_followers=true&_following=true'

function SingleUser() {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const http = useAxios()
    let navigate = useNavigate()
    const { name } = useParams()

    if (!name) {
        navigate('/')
    }

    const endpoint = socialUsers + '/' + name + postFilter

    useEffect(
        function () {
            async function getUser() {
                try {
                    const response = await http.get(endpoint)
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
        // [url]
        []
    )

    let bannerImage = user.banner
    let avatarImage = user.avatar

    if (!bannerImage) {
        bannerImage = bannerProfile
    }

    if (!avatarImage) {
        avatarImage = avatarProfile
    }

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
                <img src={bannerImage} alt="" />
                <img src={avatarImage} alt="" />
                <p>{user.name}</p>
                <div>
                    <FollowUnfollowUser data={user.followers} />
                    <p>{user.following.length} Following</p>
                </div>
            </div>
            <div>
                <SingleUserPosts />
            </div>
        </div>
    )
}

export default SingleUser
