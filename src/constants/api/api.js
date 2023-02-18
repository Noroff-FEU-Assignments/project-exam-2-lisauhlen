/**
 * This file contains:
 * - The API Base Url.
 * - The API endpoints used in this app.
 * - The _flag query parameters used to filter the API calls.
 */

export const BASE_URL = 'https://api.noroff.dev/api/v1/'

// Other endpoints used in this app:

// Register endpoint
export const registerUser = 'social/auth/register'

// Login endpoint
export const login = 'social/auth/login'

// Endpoint to social posts
export const socialPosts = 'social/posts'

// Endpoint to users
export const socialUsers = 'social/profiles'

// _flags used to filter the API calls:

// limiting the call to display 40 results, and showing the author, comments and reactions info
export const postFlags = '?limit=40&_author=true&_comments=true&_reactions=true'

// limiting the call to display 40 results, and showing the followers and following info
export const userFlags = '?limit=40&_followers=true&_following=true'
