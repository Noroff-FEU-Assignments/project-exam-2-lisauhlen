import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import useAxios from '../../hooks/useAxios'
import { socialUsers, userFlags } from '../../constants/api/api'
import Loader from '../common/Loader'
import Heading from '../layout/Heading'
import BackButton from '../common/BackButton'
import SingleUserPosts from './SingleUserPosts'
import FollowUnfollowUser from './FollowUnfollowUser'
import ErrorComponent from '../common/ErrorComponent'
import { singleUserError } from '../common/ErrorMessages'
import avatarProfile from '../../images/avatarProfile.svg'
import bannerProfile from '../../images/bannerProfile.svg'

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

    const endpoint = socialUsers + '/' + name + userFlags

    useEffect(function () {
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
    }, [])

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
        <div className="position-relative">
            <BackButton data="back" />
            <Heading headingLevel="h1">{user.name}</Heading>
            <Image fluid src={bannerImage} alt="" className="profile-banner" />
            <Container className="user-profile">
                <Image
                    roundedCircle
                    src={avatarImage}
                    alt=""
                    className="profile-avatar"
                />
                <p className="username">{user.name}</p>

                <FollowUnfollowUser data={user} />
            </Container>
            <Container>
                <SingleUserPosts />
            </Container>
        </div>
    )
}

export default SingleUser
