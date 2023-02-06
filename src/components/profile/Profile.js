import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { BASE_URL, socialUsers } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import Loader from '../common/Loader'
import Heading from '../layout/Heading'
import Logout from './Logout'
import ProfilePosts from './ProfilePosts'
import ErrorComponent from '../common/ErrorComponent'
import { profileError } from '../common/ErrorMessages'

function Profile() {
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const url = BASE_URL + socialUsers + '/' + auth.name

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }

    useEffect(function () {
        async function getProfile() {
            try {
                const response = await axios(url, options)
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

    let banner = profile.banner
    let avatar = profile.avatar

    if (!profile.banner) {
        banner =
            'https://res.cloudinary.com/lisaur/image/upload/v1675421845/PE2/banner-default_abhzmm.svg'
    }

    if (!profile.avatar) {
        avatar =
            'https://res.cloudinary.com/lisaur/image/upload/v1675421845/PE2/avatar-default_kbh9mo.svg'
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{profileError}</ErrorComponent>
    }

    return (
        <div>
            <Heading headingLevel="h1">{profile.name}</Heading>
            <Logout />
            <div>
                <img src={banner} alt="" />
                <Button href={'/profile/update-images'}>+</Button>
                <img src={avatar} alt="" />
                <Button href={'/profile/update-images'}>+</Button>
                <p>{profile.name}</p>
                <div>
                    <p>{profile._count.following} Following</p>
                    <p>{profile._count.followers} Followers</p>
                </div>
            </div>
            <div>
                <ProfilePosts />
            </div>
        </div>
    )
}

export default Profile
