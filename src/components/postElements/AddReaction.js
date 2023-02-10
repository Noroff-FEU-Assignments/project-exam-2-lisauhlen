import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import useAxios from '../../hooks/useAxios'
import { socialPosts } from '../../constants/api/api'
import { addReactionError } from '../common/ErrorMessages'
import ErrorComponent from '../common/ErrorComponent'

function AddReaction(post) {
    const reactionSum = post.data.reactions.reduce(
        (prev, current) => prev + current.count,
        0
    )

    const [reactionError, setReactionError] = useState(null)
    const [reactionCount, setReactionCount] = useState(reactionSum)

    const http = useAxios()
    const { id } = useParams()
    const endpoint = socialPosts + '/' + id + '/react/❤️'

    function HandleClick() {
        async function addReaction() {
            try {
                const response = await http.put(endpoint, {})
                console.log(response.data)
                setReactionCount(reactionCount + 1)
            } catch (error) {
                console.log(error)
                setReactionError(error.toString())
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
                </ErrorComponent>
            ) : (
                <></>
            )}
        </div>
    )
}

export default AddReaction
