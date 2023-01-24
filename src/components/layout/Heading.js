import React from 'react'

function Heading({ headingLevel, children }) {
    const HTag = headingLevel

    return <HTag>{children}</HTag>
}

export default Heading
