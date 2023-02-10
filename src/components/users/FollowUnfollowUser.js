import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import useAxios from '../../hooks/useAxios'
import { socialUsers } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import ErrorComponent from '../common/ErrorComponent'
import { followUserError, unfollowUserError } from '../common/ErrorMessages'

function FollowUnfollowUser(followers) {
    const [auth, setAuth] = useContext(AuthContext)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followerNr, setFollowerNr] = useState(followers.data)
    const [followError, setFollowError] = useState(null)
    const [unfollowError, setUnfollowError] = useState(null)

    const http = useAxios()
    const { name } = useParams()
    const endpoint = socialUsers + '/' + name

    useEffect(function () {
        followers.data.map(function (follower) {
            if (follower.name === auth.name) {
                setIsFollowing(true)
            }
        })
    }, [])

    function followUser() {
        setFollowError(null)

        async function followThisUser() {
            try {
                const response = await http.put(endpoint + '/follow', {})
                console.log(response.data)
                setIsFollowing(true)
                const newFollower = response.data
                setFollowerNr([...followerNr, newFollower])
            } catch (error) {
                console.log(error)
                setFollowError(error.toString())
            }
        }
        followThisUser()
    }

    function unfollowUser() {
        setUnfollowError(null)

        async function unfollowThisUser() {
            try {
                const response = await http.put(endpoint + '/unfollow', {})
                console.log(response.data)
                setIsFollowing(false)
                const lostFollower = response.data
                setFollowerNr(
                    followerNr.filter(
                        (follower) => follower.name !== lostFollower.name
                    )
                )
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
                    </ErrorComponent>
                )}
            </div>
            <div>
                {unfollowError && (
                    <ErrorComponent>
                        <p>{unfollowUserError}</p>
                    </ErrorComponent>
                )}
            </div>
            <p>{followerNr.length} Followers</p>
        </div>
    )
}

export default FollowUnfollowUser
