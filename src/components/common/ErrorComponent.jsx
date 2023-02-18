import React from 'react'

/**
 * This is the Error Component used to display error that occur in the app - outside of forms. (Forms use the FormError component).
 * It takes the error message as a prop, and wraps it in the div.
 * The div ensures all error messages gets the same styling.
 */

function ErrorComponent({ children }) {
    return (
        <div className="error-component">
            <p>{children}</p>
        </div>
    )
}

export default ErrorComponent
