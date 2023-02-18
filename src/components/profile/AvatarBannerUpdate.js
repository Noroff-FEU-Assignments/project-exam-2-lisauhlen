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

function AvatarBannerUpdate() {
    const [auth, setAuth] = useContext(AuthContext)

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
