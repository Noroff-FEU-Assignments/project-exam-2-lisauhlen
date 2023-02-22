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

/**
 * This is the Single User component, displaying a single user's information.
 * It checks for avatar and banner images, and sets default images if they're missing.
 * It renders the FollowUnfollowUser component to allow following/unfollowing, and display followers and following information.
 * It renders the SingleUserPosts component to display the user's posts.
 */

function SingleUser() {
    // Setting up useStates to handle the result, loading, and any errors.
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Declaring the Axios instance and the useNavigate hook.
    const http = useAxios()
    let navigate = useNavigate()

    // Getting name from the URL. If no name, navigate to home.
    const { name } = useParams()

    if (!name) {
        navigate('/home')
    }

    // Creating the URL for the API call.
    const endpoint = socialUsers + '/' + name + userFlags

    useEffect(function () {
        async function getUser() {
            // Making the get request. On success, result is the value of user.
            // Setting error as the value of error, and loading to false.

            try {
                const response = await http.get(endpoint)
                setUser(response.data)
            } catch (error) {
                console.log(error)
                setError(error.toString())
            } finally {
                setLoading(false)
            }
        }
        getUser()
    }, []) // eslint-disable-line

    // Checking for avatar and banner images. If no none, default images are set.
    let bannerImage = user.banner
    let avatarImage = user.avatar

    if (!bannerImage) {
        bannerImage = bannerProfile
    }

    if (!avatarImage) {
        avatarImage = avatarProfile
    }

    // Rendering the loader on page load.
    if (loading) {
        return <Loader />
    }

    // Rendering a custom error message if error.
    if (error) {
        return <ErrorComponent>{singleUserError}</ErrorComponent>
    }

    // Rendering the user profile.
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
