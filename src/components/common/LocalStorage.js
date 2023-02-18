/**
 * These are reusable functions that handle the Local Storage operations.
 */

// Saving to local storage
export function SaveToStorage(key, valueToSave) {
    localStorage.setItem(key, JSON.stringify(valueToSave))
}

// Retrieving from local storage
export function RetrieveFromStorage(key) {
    const value = localStorage.getItem(key)

    if (!value) {
        return []
    }

    return JSON.parse(value)
}
