import React from 'react'
import { useNavigate } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import backIcon from '../../images/backIcon.svg'
import closeIcon from '../../images/closeIcon.svg'

/**
 * This is the Back button.
 * On click, it navigates to the previous page.
 */

function BackButton(value) {
    const navigate = useNavigate()

    function goBack() {
        navigate(-1)
    }

    if (value.data === 'close') {
        return (
            <div onClick={goBack} className="back-button">
                <Image src={closeIcon} alt="close icon" />
            </div>
        )
    }

    return (
        <div onClick={goBack} className="back-button">
            <Image src={backIcon} alt="back button" />
        </div>
    )
}

export default BackButton
