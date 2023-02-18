import { useState } from 'react'

/**
 * This is the useLocalStorage hook, from https://usehooks.com/useLocalStorage/
 * It is used in the AuthContext component to save and retrieve the auth value from Local Storage.
 */

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })

    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value

            setStoredValue(valueToStore)

            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.log(error)
        }
    }

    return [storedValue, setValue]
}
