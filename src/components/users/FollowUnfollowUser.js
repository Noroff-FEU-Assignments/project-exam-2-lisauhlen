import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import useAxios from '../../hooks/useAxios'
import { socialUsers } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import ErrorComponent from '../common/ErrorComponent'
import { followUserError, unfollowUserError } from '../common/ErrorMessages'

function FollowUnfollowUser(user) {
    const [auth, setAuth] = useContext(AuthContext)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followerNr, setFollowerNr] = useState(user.data.followers)
    const [followError, setFollowError] = useState(null)
    const [unfollowError, setUnfollowError] = useState(null)

    const http = useAxios()
    const { name } = useParams()
    const endpoint = socialUsers + '/' + name

    useEffect(function () {
        user.data.followers.map(function (follower) {
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
        <>
            <div className="user-info">
                {isFollowing ? (
                    <Button onClick={unfollowUser} className="follow">
                        Unfollow
                    </Button>
                ) : (
                    <Button onClick={followUser} className="follow">
                        Follow
                    </Button>
                )}
                <p>{followerNr.length} Followers</p>
                <p>{user.data.following.length} Following</p>
            </div>
            {followError && <ErrorComponent>{followUserError}</ErrorComponent>}
            {unfollowError && (
                <ErrorComponent>{unfollowUserError}</ErrorComponent>
            )}
        </>
    )
}

export default FollowUnfollowUser
