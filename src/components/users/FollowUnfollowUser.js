import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { BASE_URL, socialUsers } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import ErrorComponent from '../common/ErrorComponent'
import { followUserError, unfollowUserError } from '../common/ErrorMessages'

function FollowUnfollowUser(followers) {
    const [auth, setAuth] = useContext(AuthContext)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followerNr, setFollowerNr] = useState(followers.data.length)
    const [followError, setFollowError] = useState(null)
    const [unfollowError, setUnfollowError] = useState(null)

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }

    const { name } = useParams()

    const url = BASE_URL + socialUsers + '/' + name

    useEffect(function () {
        followers.data.map(function (follower) {
            if (follower.name === auth.name) {
                setIsFollowing(true)
            }
        })
    }, [])

    function followUser() {
        async function followThisUser() {
            try {
                const response = await axios.put(url + '/follow', {}, options)
                console.log(response)
                setIsFollowing(true)
                setFollowerNr(followers.data.length + 1)
            } catch (error) {
                console.log(error)
                const errorMessage = error.response.data.errors[0].message
                setFollowError(errorMessage)
            }
        }
        followThisUser()
    }

    function unfollowUser() {
        async function unfollowThisUser() {
            try {
                const response = await axios.put(url + '/unfollow', {}, options)
                console.log(response)
                setIsFollowing(false)
                setFollowerNr(followers.data.length - 1)
            } catch (error) {
                console.log(error)
                const errorMessage = error.response.data.errors[0].message
                setUnfollowError(errorMessage)
            }
        }
        unfollowThisUser()
    }

    return (
        <div>
            <div>
                {isFollowing ? (
                    <Button onClick={unfollowUser}>Unfollow</Button>
                ) : (
                    <Button onClick={followUser}>Follow</Button>
                )}
            </div>
            <div>
                {followError && (
                    <ErrorComponent>
                        <p>{followUserError}</p>
                        <p>Error message: {followError}</p>
                    </ErrorComponent>
                )}
            </div>
            <div>
                {unfollowError && (
                    <ErrorComponent>
                        <p>{unfollowUserError}</p>
                        <p>Error message: {unfollowError}</p>
                    </ErrorComponent>
                )}
            </div>
            <p>{followerNr} Followers</p>
        </div>
    )
}

export default FollowUnfollowUser
