import React from 'react'
import AvatarImage from './AvatarImage'
import Card from 'react-bootstrap/Card'

function AuthorInfo(data) {
    const post = data.data
    const dayjs = require('dayjs')
    const date = dayjs(post.updated).format('D. MMM YYYY')

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
