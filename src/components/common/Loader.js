import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

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
