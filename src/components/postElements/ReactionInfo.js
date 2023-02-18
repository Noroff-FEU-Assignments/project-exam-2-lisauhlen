import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import commentsIcon from '../../images/commentsIcon.svg'
import CountReactions from './CountReactions'

/**
 * This is the Reaction Info component.
 * It returns the number of post comments and reactions in a ButtonGroup component.
 * It renders the CountReactions to summarize the total number of post reactions.
 */

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
