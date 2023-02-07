import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import { addReactionError } from '../common/ErrorMessages'
import ErrorComponent from '../common/ErrorComponent'

function AddReaction(post) {
    const reactionSum = post.data.reactions.reduce(
        (prev, current, index) => prev + current.count,
        0
    )

    const [auth, setAuth] = useContext(AuthContext)
    const [reactionError, setReactionError] = useState(null)
    const [reactionCount, setReactionCount] = useState(reactionSum)

    const { id } = useParams()

    const url = BASE_URL + socialPosts + '/' + id + '/react/❤️'

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }

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
                <ErrorComponent>
                    <p>{addReactionError}</p>
                    <p>Error message: {reactionError}</p>
                </ErrorComponent>
            ) : (
                <></>
            )}
        </div>
    )
}

export default AddReaction
