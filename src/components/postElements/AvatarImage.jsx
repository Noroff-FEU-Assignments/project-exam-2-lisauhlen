import React from 'react'
import Image from 'react-bootstrap/Image'
import avatarFeed from '../../images/avatarFeed.svg'

/**
 * This is the Avatar Image component.
 * It checks if the user has an avatar image - if not, it sets a default avatar image.
 * It returns the Avatar image in an Image component.
 */

function AvatarImage(avatar) {
    // Declaring the avatar image variable.
    let avatarImage = avatar.data.author.avatar

    // Checking for avatar image. If none, a default image is set.
    if (!avatarImage) {
        avatarImage = avatarFeed
    }

    // Rendering the avatar image.
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
