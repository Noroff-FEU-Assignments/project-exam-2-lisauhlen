import React from 'react'
import Button from 'react-bootstrap/Button'

/**
 * This is the Count Reactions component, which calculates the post's total number of reactions.
 * It takes 'post.reactions' as an argument and uses .reduce() to summarize all the post's reactions.
 * It returns a button containing the heart emoji and the total number of reactions.
 */

function CountReactions(reactions) {
    if (!reactions.data) {
        return null
    }
    const count = reactions.data.reduce(
        (prev, current) => prev + current.count,
        0
    )

    return <Button variant="secondary">❤️ {count}</Button>
}

export default CountReactions
