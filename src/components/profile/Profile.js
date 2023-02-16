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

function Profile() {
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const http = useAxios()
    const endpoint = socialUsers + '/' + auth.name

    useEffect(function () {
        async function getProfile() {
            try {
                const response = await http.get(endpoint)
                console.log(response.data)
                setProfile(response.data)
            } catch (error) {
                console.log(error)
                setError(error.toString())
            } finally {
                setLoading(false)
            }
        }
        getProfile()
    }, [])

    let bannerImage = profile.banner
    let avatarImage = profile.avatar

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
        return <ErrorComponent>{profileError}</ErrorComponent>
    }

    return (
        <div className="position-relative">
            <Heading headingLevel="h1">{profile.name}</Heading>
            <Logout />
            <div className='banner-container'>
                <Image
                    fluid
                    src={bannerImage}
                    alt=""
                    className="profile-banner"
                />
                <Link to={'/profile/update-images'}>
                    <Image src={secondaryButton} />
                </Link>
            </div>
            <Container className="user-profile">
                <div className='avatar-container'>
                    <Image
                        roundedCircle
                        src={avatarImage}
                        alt=""
                        className="profile-avatar"
                    />
                    <Link to={'/profile/update-images'}>
                        <Image src={secondaryButton} />
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
