import React from 'react'

/**
 * This is the Post Icon component.
 * It returns the Post icon svg.
 */

function PostIcon() {
    return (
        <svg
            id="post-icon"
            aria-labelledby="postIconTitle"
            role="img"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id="postIconTitle">Post icon</title>
            <path
                d="M10.5 1V20M1 10.5H20"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default PostIcon
