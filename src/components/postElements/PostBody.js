import React from 'react'
import Heading from '../layout/Heading'

function PostBody(data) {
    const post = data.data

    return (
        <>
            <img src={post.media} alt="" />
            <Heading headingLevel="h2">{post.title}</Heading>
            <p>{post.body}</p>
        </>
    )
}

export default PostBody
