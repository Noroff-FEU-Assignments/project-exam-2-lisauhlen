import React from 'react'

function CountReactions(reactions) {

    const count = reactions.data.reduce(
        (prev, current) => prev + current.count,
        0
    )

    return <div>❤️ {count}</div>
}

export default CountReactions
