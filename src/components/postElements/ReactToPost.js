import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import { addReactionError } from '../common/ErrorMessages'

function ReactToPost() {
    const [auth, setAuth] = useContext(AuthContext)
    const [reactionError, setReactionError] = useState(null)
    const [reactionCount, setReactionCount] = useState([])

    const { id } = useParams()

    const url = BASE_URL + socialPosts + '/' + id + '/react/❤️'

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }

    useEffect(function () {
        async function getReactions() {
            const getUrl =
                BASE_URL + socialPosts + '/' + id + '?_reactions=true'
            try {
                const response = await axios(getUrl, options)
                console.log(response.data)
                const reactionSum = response.data.reactions.reduce(
                    (prev, current, index) => prev + current.count,
                    0
                )
                console.log(reactionSum)
                setReactionCount(reactionSum)
            } catch (error) {
                console.log(error)
            }
        }
        getReactions()
    }, [])

    function HandleClick() {
        async function addReaction() {
            try {
                const response = await axios.put(url, {}, options)
                console.log(response.data)
                setReactionCount(reactionCount + 1)
            } catch (error) {
                console.log(error)
                const errorMessage = error.response.data.errors[0].message
                setReactionError(errorMessage)
            }
        }
        addReaction()
    }

    return (
        <div>
            <Button onClick={HandleClick}>React with a ❤️</Button>
            <span>{reactionCount}</span>
            {reactionError ? (
                <div>
                    <p>{addReactionError}</p>
                    <p>Error message: {reactionError}</p>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default ReactToPost
