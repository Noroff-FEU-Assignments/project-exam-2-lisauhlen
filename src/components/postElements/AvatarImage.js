import React from 'react'
import Image from 'react-bootstrap/Image'
import avatarFeed from '../../images/avatarFeed.svg'

/**
 * This is the Avatar Image component.
 * It checks if the user has an avatar image - if not, it sets a default avatar image.
 * It returns the Avatar image in an Image component.
 */

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
            alt=""
        ></Image>
    )
}

export default AvatarImage
