import PropTypes from 'prop-types'

/**
 * This is the Form Error component used to display error that occur inside forms. (Errors outside forms use the ErrorComponent)
 * It takes the error message as a prop, and wraps it in the div.
 * The div ensures all error messages gets the same styling.
 * The component is validated with PropTypes.
 */

export default function ValidationError({ children }) {
    return (
        <div className="form-error">
            <p>{children}</p>
        </div>
    )
}

ValidationError.propTypes = {
    children: PropTypes.node.isRequired,
}
