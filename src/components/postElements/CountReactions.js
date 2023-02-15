import React from 'react'
import Button from 'react-bootstrap/Button';

function CountReactions(reactions) {

    const count = reactions.data.reduce(
        (prev, current) => prev + current.count,
        0
    )

    return <Button variant="secondary">❤️ {count}</Button>
}

export default CountReactions
