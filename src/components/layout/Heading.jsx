import React from 'react'

/**
 * This is the Heading component.
 * It takes the heading level and children as props, and returns a heading tag.
 *
 * @example <Heading headingLevel="h1">Welcome<Heading>
 * @returns <h1>Welcome<h1>
 */

function Heading({ headingLevel, children }) {
    const HTag = headingLevel

    return <HTag>{children}</HTag>
}

export default Heading
