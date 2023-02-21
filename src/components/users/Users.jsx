import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import useAxios from '../../hooks/useAxios'
import { socialUsers, userFlags } from '../../constants/api/api'
import Loader from '../common/Loader'
import Heading from '../layout/Heading'
import ErrorComponent from '../common/ErrorComponent'
import { userListError } from '../common/ErrorMessages'
import avatarProfile from '../../images/avatarProfile.svg'

/**
 * This is the Users component. It gets a list of users from the API and displays them in Cards.
 * It checks for avatar images, and sets default images for the ones missing.
 * If banner image exists, it is displayed.
 * It displays Username, followers and following information.
 */

function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const http = useAxios()
    const endpoint = socialUsers + userFlags

    useEffect(function () {
        async function getUsers() {
            try {
                const response = await http.get(endpoint)
                setUsers(response.data)
            } catch (error) {
                console.log(error)
                setError(error.toString())
            } finally {
                setLoading(false)
            }
        }
        getUsers()
    }, [])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComponent>{userListError}</ErrorComponent>
    }

    return (
        <Container>
            <Heading headingLevel="h1">Users</Heading>
            {users.map(function (user) {
                let avatarImage = user.avatar

                if (!avatarImage) {
                    avatarImage = avatarProfile
                }

                return (
                    <Link to={`/users/${user.name}`} key={user.name}>
                        <Card>
                            {user.banner ? (
                                <Card.Img
                                    variant="top"
                                    className="user-banner"
                                    src={user.banner}
                                    alt=""
                                />
                            ) : (
                                <></>
                            )}
                            <Card.Body
                                className={`user-card ${
                                    user.banner ? 'bottom-align' : ''
                                }`}
                            >
                                <Image
                                    roundedCircle
                                    className="user-avatar"
                                    src={avatarImage}
                                    alt=""
                                />
                                <div>
                                    <p className="username">{user.name}</p>
                                    <div className="follower-info">
                                        <p>{user.followers.length} Followers</p>
                                        <p>{user.following.length} Following</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                )
            })}
        </Container>
    )
}

export default Users
