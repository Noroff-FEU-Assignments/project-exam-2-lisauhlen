import React from 'react'
import CountReactions from './CountReactions'
import commentsIcon from '../../images/commentsIcon.svg'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function ReactionInfo(data) {
    const post = data.data

    return (
        <Card.Body className="text-center">
            <ButtonGroup>
                <Button variant="secondary">
                    <img src={commentsIcon} alt="Comments icon" />{' '}
                    {post._count.comments}
                </Button>
                <CountReactions data={post.reactions} />
            </ButtonGroup>
        </Card.Body>
    )
}

export default ReactionInfo
