import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import useAxios from '../../hooks/useAxios'
import { socialPosts } from '../../constants/api/api'
import FormError from '../common/FormError'
import { deletePostError } from '../common/ErrorMessages'

function PostMenu(postId) {
    const [deleteError, setDeleteError] = useState(null)

    const http = useAxios()
    const navigate = useNavigate()
    const endpoint = socialPosts + '/' + postId.postId

    function handleClick() {
        const confirmDeletion = window.confirm(
            'Are you sure you want to delete this post?'
        )

        if (confirmDeletion) {

            async function deletePost() {
                try {
                    const response = await http.delete(endpoint)
                    console.log(response)
                    navigate('/home')
                } catch (error) {
                    console.log(error)
                    const errorMessage = error.response.data.errors[0].message
                    setDeleteError(errorMessage)
                }
            }
            deletePost()
        }
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Menu
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href={'/post/' + postId.postId}>
                        Edit Post
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleClick}>Delete Post</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {deleteError && (
                    <FormError>
                        <div>
                            <p>{deletePostError}</p>
                            <p>Error message: {deleteError}</p>
                        </div>
                    </FormError>
                )}
        </>
    )
}

export default PostMenu
