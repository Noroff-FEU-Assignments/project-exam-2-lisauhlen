import { useState } from 'react'

/**
 * This is the useLocalStorage hook, from https://usehooks.com/useLocalStorage/
 * It is used in the AuthContext component to save and retrieve the auth value from Local Storage.
 */

export default function useLocalStorage(key, initialValue) {
    // Setting up useState to store the values
    const [storedValue, setStoredValue] = useState(() => {
        // Getting item from local storage, parsing JSON if needed.
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            // If error also return initialValue
            console.log(error)
            return initialValue
        }
    })

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value
            // Save state
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.log(error)
        }
    }

    return [storedValue, setValue]
}
