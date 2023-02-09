import React from 'react'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
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
        <div>
            <Heading headingLevel="h1">{auth.name}</Heading>
            <div>
                <Heading headingLevel="h2">Avatar</Heading>
                <img src={avatar} alt="You current profile picture" />
                <AvatarUpdate />
            </div>
            <div>
                <Heading headingLevel="h2">banner</Heading>
                <img src={banner} alt="You current banner" />
                <BannerUpdate />
            </div>
        </div>
    )
}

export default AvatarBannerUpdate
