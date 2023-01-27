import PropTypes from 'prop-types'

export default function ValidationError({ children }) {
    return <span className="form-error">{children}</span>
}

ValidationError.proptTypes = {
    children: PropTypes.node.isRequired,
}
