import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import useAxios from '../../hooks/useAxios'
import { socialUsers } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import Loader from '../common/Loader'
import Heading from '../layout/Heading'
import Logout from './Logout'
import ProfilePosts from './ProfilePosts'
import ErrorComponent from '../common/ErrorComponent'
import { profileError } from '../common/ErrorMessages'
import avatarProfile from '../../images/avatarProfile.svg'
import bannerProfile from '../../images/bannerProfile.svg'
import secondaryButton from '../../images/secondaryButton.svg'

/**
 * This is the Profile page. It displays the user's own info and posts, and allows the user to logout.
 * It checks for avatar and banner images and sets default images if they're missing. Buttons link to the page where images can be changed.
 * Number of followers and following are displayed.
 * It also renders the ProfilePosts component, which displays the user's post's.
 */

function Profile() {
    // Setting up useStates to handle the result, loading, and any errors. Using useContext to handle authentication.
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth] = useContext(AuthContext)

    // Declaring the Axios instance and creating the URL.
    const http = useAxios()
    const endpoint = socialUsers + '/' + auth.name

    // Making the get request. On success, result is set as the value of profile.
    // Setting error as the value of error, and loading to false.
    useEffect(function () {
        async function getProfile() {
            try {
                const response = await http.get(endpoint)
                setProfile(response.data)
            } catch (error) {
                console.log(error)
                setError(error.toString())
            } finally {
                setLoading(false)
            }
        }
        getProfile()
    }, []) // eslint-disable-line

    // Checking for avatar and banner images. If no none, default images are set.
    let bannerImage = profile.banner
    let avatarImage = profile.avatar

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
        return <ErrorComponent>{profileError}</ErrorComponent>
    }

    // Rendering the user profile.
    return (
        <div className="position-relative">
            <Heading headingLevel="h1">{profile.name}</Heading>
            <Logout />
            <div className="banner-container">
                <Image
                    fluid
                    src={bannerImage}
                    alt=""
                    className="profile-banner"
                />
                <Link to={'/profile/update-images'}>
                    <Image
                        src={secondaryButton}
                        alt="Edit banner image button."
                    />
                </Link>
            </div>
            <Container className="user-profile">
                <div className="avatar-container">
                    <Image
                        roundedCircle
                        src={avatarImage}
                        alt=""
                        className="profile-avatar"
                    />
                    <Link to={'/profile/update-images'}>
                        <Image
                            src={secondaryButton}
                            alt="Edit profile picture button."
                        />
                    </Link>
                </div>
                <p className="username">{profile.name}</p>
                <div className="user-info own-profile">
                    <p>{profile._count.following} Following</p>
                    <p>{profile._count.followers} Followers</p>
                </div>
            </Container>
            <Container>
                <ProfilePosts />
            </Container>
        </div>
    )
}

export default Profile
