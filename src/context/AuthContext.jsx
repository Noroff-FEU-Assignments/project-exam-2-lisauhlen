import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

/**
 * This is the Auth Context component.
 * It makes the auth variable available to all app files through the AuthProvider component.
 * It saves auth's state to Local Storage by using the useLocalStorage component.
 */

const AuthContext = React.createContext([null, () => {}])

export const AuthProvider = (props) => {
    const [auth, setAuth] = useLocalStorage('auth', null)
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
