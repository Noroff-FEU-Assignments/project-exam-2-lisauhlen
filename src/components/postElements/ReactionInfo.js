import React from 'react'
import CountReactions from './CountReactions'
import commentsIcon from '../../images/commentsIcon.svg'

function ReactionInfo(data) {
    const post = data.data

  return (
    <div>
        <span>
            <img src={commentsIcon} alt="Comments icon" />{' '}
            {post._count.comments}
        </span>
        <CountReactions data={post.reactions} />
    </div>
  )
}

export default ReactionInfo