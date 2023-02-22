import React from 'react'
import Card from 'react-bootstrap/Card'
import AvatarImage from './AvatarImage'

/**
 * This is the Author Info component.
 * It takes the post information as an argument, and renders the AvatarImage component, the author name and the post date.
 * The post date is formatted using Day.js.
 */

function AuthorInfo(data) {
    // Declaring the post data variable.
    const post = data.data

    // Setting the date format with Day.js.
    const dayjs = require('dayjs')
    const date = dayjs(post.updated).format('D. MMM YYYY')

    // Rendering the author info.
    return (
        <Card.Body className="author-info">
            <AvatarImage data={post} />
            <div>
                <p className="username">{post.author.name}</p>
                <p className="date">{date}</p>
            </div>
        </Card.Body>
    )
}

export default AuthorInfo
