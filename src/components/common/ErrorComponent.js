import React from 'react'

function ErrorComponent({ children }) {
    return (
        <div className="error-component">
            <p>{children}</p>
        </div>
    )
}

export default ErrorComponent
