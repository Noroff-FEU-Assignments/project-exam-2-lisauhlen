import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { socialPosts } from '../../constants/api/api'
import { addReactionError } from '../common/ErrorMessages'
import ErrorComponent from '../common/ErrorComponent'
import heartAnimation from './heartAnimation'

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
        setReactionError(null)

        heartAnimation()

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
        <>
            <div onClick={HandleClick} className="add-reaction">
                <span className="heart">❤️</span> <span>{reactionCount}</span>
            </div>

            {reactionError ? (
                <ErrorComponent>{addReactionError}</ErrorComponent>
            ) : (
                <></>
            )}
        </>
    )
}

export default AddReaction
