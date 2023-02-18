import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

/**
 * This is the Loader component.
 * It returns the Loader.
 */

function Loader() {
    return (
        <div className="loaders">
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
        </div>
    )
}

export default Loader
