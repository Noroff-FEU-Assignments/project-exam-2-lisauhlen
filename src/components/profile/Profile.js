import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { BASE_URL, socialUsers } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import Loader from '../common/Loader'
import Heading from '../layout/Heading'
import ProfilePosts from './ProfilePosts'
import ErrorComponent from '../common/ErrorComponent'
import {profileError} from "../common/ErrorMessages"

function Profile() {
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)
    
    const url = BASE_URL + socialUsers + "/" + auth.name

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

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{profileError}</ErrorComponent>
    }

    return (
        <div>
            <Heading headingLevel="h1">{profile.name}</Heading>
            <div>
                <img src={profile.banner} alt="" />
                <img src={profile.avatar} alt="" />
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
