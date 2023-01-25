import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialUsers } from '../../constants/api/api'
import Heading from '../layout/Heading'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { userListError } from '../common/ErrorMessages'

const postFilter = '?limit=40&_followers=true&_following=true'

const url = BASE_URL + socialUsers + postFilter

let token = null

function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    token = localStorage.getItem('token')

    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    useEffect(function () {
        async function getUsers() {
            try {
                const response = await axios(url, options)
                console.log(response.data)
                setUsers(response.data)
            } catch (error) {
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
        <div>
            <Heading headingLevel="h1">Users</Heading>
            {users.map(function (user) {
                return (
                    <Link to={`/users/${user.name}`} key={user.name}>
                        <img src={user.banner} alt=""></img>
                        <img src={user.avatar} alt=""></img>
                        <p>{user.name}</p>
                        <p>{user.followers.length} Followers</p>
                        <p>{user.following.length} Following</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default Users
