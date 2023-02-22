import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import useAxios from '../../hooks/useAxios'
import { socialUsers } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import ErrorComponent from '../common/ErrorComponent'
import { followUserError, unfollowUserError } from '../common/ErrorMessages'

/**
 * This is the Follow Unfollow User component. It allows the user to follow/unfollow other users.
 * It checks if the user is already a follower, and displays a follow/unfollow button accordingly.
 * On click, the user starts or stops following the other user.
 * It also displays the number of followers and following.
 */

function FollowUnfollowUser(user) {
    // Setting up useStates to handle the follow info, result, and any errors.
    // Using useContext to handle authentication.
    const [auth] = useContext(AuthContext)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followerNr, setFollowerNr] = useState(user.data.followers)
    const [followError, setFollowError] = useState(null)
    const [unfollowError, setUnfollowError] = useState(null)

    // Declaring the Axios instance.
    const http = useAxios()

    // Getting name from the URL and creating the URL for the API call.
    const { name } = useParams()
    const endpoint = socialUsers + '/' + name

    // Checking if we're already following the user.
    useEffect(function () {
        user.data.followers.forEach(function (follower) {
            if (follower.name === auth.name) {
                setIsFollowing(true)
            }
        })
    }, []) // eslint-disable-line

    // This function runs if the 'follow' button is clicked.
    function followUser() {
        setFollowError(null)

        // The put request is made. On success, response is added to the followerNr array, and isFollowing is set to true.
        // Setting error as the value of followError.
        async function followThisUser() {
            try {
                const response = await http.put(endpoint + '/follow', {})
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

    // This function runs if the 'unfollow' button is clicked.
    function unfollowUser() {
        setUnfollowError(null)

        // The put request is made. On success, response is removed from to the followerNr array, and isFollowing is set to false.
        // Setting error as the value of unfollowError.
        async function unfollowThisUser() {
            try {
                const response = await http.put(endpoint + '/unfollow', {})
                setIsFollowing(false)
                const lostFollower = response.data
                setFollowerNr(
                    followerNr.filter(
                        (follower) => follower.name !== lostFollower.name
                    )
                )
            } catch (error) {
                console.log(error)
                setUnfollowError(error.toString())
            }
        }
        unfollowThisUser()
    }

    // Rendering the follow/unfollow button and followers and following information.
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
