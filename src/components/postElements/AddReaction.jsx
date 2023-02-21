import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { socialPosts } from '../../constants/api/api'
import heartAnimation from './heartAnimation'
import { addReactionError } from '../common/ErrorMessages'
import ErrorComponent from '../common/ErrorComponent'

/**
 * This is the Add Reaction component.
 * It lets the user react to the post with the heart emoji and displays the post's total number of reactions.
 * It also calls the heartAnimation function that animates the heart emoji.
 */

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
                await http.put(endpoint, {})
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
