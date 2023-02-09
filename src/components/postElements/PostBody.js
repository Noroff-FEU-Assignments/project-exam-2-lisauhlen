import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../layout/Heading'
import CountReactions from '../postElements/CountReactions'
import commentsIcon from '../../images/commentsIcon.svg'

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
