import React from 'react'
import AvatarImage from './AvatarImage'

function AuthorInfo(data) {
    const post = data.data
    
  return (
    <>
        <AvatarImage data={post} />
        <p className="username">{post.author.name}</p>
        <p>{post.updated}</p>
    </>
  )
}

export default AuthorInfo