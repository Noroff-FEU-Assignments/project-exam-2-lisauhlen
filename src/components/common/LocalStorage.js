//Save and retrieve from local storage

export function SaveToStorage(key, valueToSave) {
    localStorage.setItem(key, JSON.stringify(valueToSave))
}

export function RetrieveFromStorage(key) {
    const value = localStorage.getItem(key)

    if (!value) {
        return []
    }

    return JSON.parse(value)
}
