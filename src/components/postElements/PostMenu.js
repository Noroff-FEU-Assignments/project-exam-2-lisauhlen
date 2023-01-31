import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import Loader from '../common/Loader'
import { deletePostError } from '../common/ErrorMessages'

function PostMenu(postId) {
  const [auth, setAuth] = useContext(AuthContext)
  const [deleteError, setDeleteError] = useState(null)

  function handleClick() {
    const confirmDeletion = window.confirm("Are you sure you want to delete this post?")
    
    if (confirmDeletion) {
      
      const url = BASE_URL + socialPosts + "/" + postId.postId

      const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
      }

      async function deletePost() {
        try {
          const response = await axios.delete(url, options)
          console.log(response)
          window.location.reload(false)
        } catch (error) {
          console.log(error)
          const errorMessage = error.response.data.errors[0].message
          setDeleteError(errorMessage)
          //Create a modal for this message instead??
          alert(`${deletePostError} Error message: ${errorMessage}`)
        }
      }
      deletePost()
    }
    

  }

    return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>
    
          <Dropdown.Menu>

            <Dropdown.Item href={'/post/' + postId.postId}>Edit Post</Dropdown.Item>
            <Dropdown.Item onClick={handleClick}>Delete Post</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
}

export default PostMenu


