import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image'
import useAxios from '../../hooks/useAxios'
import { socialPosts } from '../../constants/api/api'
import postMenu from '../../images/postMenu.svg'
import ErrorComponent from '../common/ErrorComponent'
import { deletePostError } from '../common/ErrorMessages'

/**
 * This is the Post Menu, which allows the post's owner to edit or delete the post.
 * It takes the 'post.id' as an argument.
 * If Edit Post is clicked, the user is navigated to the EditPost component, at 'post/:id'.
 * If Delete Post is clicked, a confirmation box is displayed.
 * If confirmed, the delete call is made to the API, using the post id.
 * It returns the menu as a Dropdown component.
 */

function PostMenu(postId) {
    const [deleteError, setDeleteError] = useState(null)

    const http = useAxios()
    const navigate = useNavigate()
    const endpoint = socialPosts + '/' + postId.postId

    function handleClick() {
        const confirmDeletion = window.confirm(
            'Are you sure you wanna delete this post?'
        )

        if (confirmDeletion) {
            async function deletePost() {
                try {
                    const response = await http.delete(endpoint)
                    console.log(response)
                    navigate('/home')
                } catch (error) {
                    console.log(error)
                    setDeleteError(error.toString())
                }
            }
            deletePost()
        }
    }

    return (
        <>
            <Dropdown className="post-menu">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <Image src={postMenu} alt="Post menu" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href={'/post/' + postId.postId}>
                        Edit Post
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleClick}>
                        Delete Post
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {deleteError && <ErrorComponent>{deletePostError}</ErrorComponent>}
        </>
    )
}

export default PostMenu
