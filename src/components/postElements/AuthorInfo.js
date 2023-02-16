import React from 'react'
import AvatarImage from './AvatarImage'
import Card from 'react-bootstrap/Card'

function AuthorInfo(data) {
    console.log(data)

    const post = data.data

    return (
        <Card.Body className="author-info">
            <AvatarImage data={post} />
            <div>
                <p className="username">{post.author.name}</p>
                <p className="date">{post.updated}</p>
            </div>
        </Card.Body>
    )
}

export default AuthorInfo
