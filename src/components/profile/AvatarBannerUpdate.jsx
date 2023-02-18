import React from 'react'
import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import AuthContext from '../../context/AuthContext'
import BackButton from '../common/BackButton'
import Heading from '../layout/Heading'
import AvatarUpdate from './AvatarUpdate'
import BannerUpdate from './BannerUpdate'
import avatarProfile from '../../images/avatarProfile.svg'
import bannerProfile from '../../images/bannerProfile.svg'

/**
 * This is the Avatar and Banner Update component that allows the user update their Avatar and Banner images.
 * It displays the current images and renders the AvatarUpdate and BannerUpdate components (where the API calls are made).
 * If the user doesn't have avatar or banner images, default images are set.
 */

function AvatarBannerUpdate() {
    const [auth] = useContext(AuthContext)

    let banner = auth.banner
    let avatar = auth.avatar

    if (!auth.banner) {
        banner = bannerProfile
    }

    if (!auth.avatar) {
        avatar = avatarProfile
    }

    return (
        <Container className="update-images-container position-relative">
            <BackButton data="value" />
            <Heading headingLevel="h1">{auth.name}</Heading>
            <Heading headingLevel="h2">Avatar</Heading>
            <div className="image-container">
                <Image
                    roundedCircle
                    src={avatar}
                    alt="You current profile picture"
                    className="avatar-image"
                />
            </div>
            <AvatarUpdate />
            <Heading headingLevel="h2">Banner</Heading>
            <div className="image-container">
                <Image
                    fluid
                    src={banner}
                    alt="You current banner image"
                    className="banner-image"
                />
            </div>
            <BannerUpdate />
        </Container>
    )
}

export default AvatarBannerUpdate
