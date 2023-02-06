import React from 'react'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import Heading from '../layout/Heading'
import AvatarUpdate from './AvatarUpdate'
import BannerUpdate from './BannerUpdate'

function AvatarBannerUpdate() {
    const [auth, setAuth] = useContext(AuthContext)

    let banner = auth.banner
    let avatar = auth.avatar

    if (!auth.banner) {
        banner =
            'https://res.cloudinary.com/lisaur/image/upload/v1675421845/PE2/banner-default_abhzmm.svg'
    }

    if (!auth.avatar) {
        avatar =
            'https://res.cloudinary.com/lisaur/image/upload/v1675421845/PE2/avatar-default_kbh9mo.svg'
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
