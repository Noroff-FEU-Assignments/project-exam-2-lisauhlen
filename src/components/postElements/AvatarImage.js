import React from 'react'
import avatarFeed from '../../images/avatarFeed.svg'
import Image from 'react-bootstrap/Image'

function AvatarImage(avatar) {
    let avatarImage = avatar.data.author.avatar

    if (!avatarImage) {
        avatarImage = avatarFeed
    }

    return (
        <Image
            src={avatarImage}
            roundedCircle
            className="author-avatar"
        ></Image>
    )
}

export default AvatarImage
