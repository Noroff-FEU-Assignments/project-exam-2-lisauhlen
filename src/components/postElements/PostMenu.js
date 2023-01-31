import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'

function PostMenu(postId) {

    return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            <Link to={`/post/${postId.postId}`}>Edit Post</Link>
            <Dropdown.Item href="#/action-2">Delete Post</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
}

export default PostMenu
