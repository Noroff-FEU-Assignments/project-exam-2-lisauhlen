import React from 'react'
import Card from 'react-bootstrap/Card'

/**
 * This is the Post Body component.
 * It takes the post information as an argument and returns it as Card components.
 */

function PostBody(data) {
    const post = data.data

    return (
        <>
            <Card.Img src={post.media} alt="" />
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
            </Card.Body>
        </>
    )
}

export default PostBody
