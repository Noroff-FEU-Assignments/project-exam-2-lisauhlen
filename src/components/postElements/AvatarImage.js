import React from 'react'
import avatarFeed from '../../images/avatarFeed.svg'

function AvatarImage(avatar) {
    let avatarImage = avatar.data.author.avatar

    if (!avatarImage) {
        avatarImage = avatarFeed
    }

    return <img src={avatarImage} className="avatar-image" alt="" />
}

export default AvatarImage
