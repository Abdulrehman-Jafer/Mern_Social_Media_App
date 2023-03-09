import { useState } from 'react'
import CommentsSection from './AllComments'
import Form from './Form'
import { ofProps } from './file.types'

const Index = ({ _id, postId, userimage, username,focusCount=0}: ofProps) => {
    const [showComments, setShowComments] = useState(false)
    const [reload, setReload] = useState(0)
    return (
        <>
            <section>
                {!showComments && <span className='text-slate-500 underline cursor-pointer' onClick={() => setShowComments(true)}>View all of the other comments</span>}
            </section>
            {focusCount > 0 && <Form userId={_id} userimage={userimage} username={username} postId={postId} reloadComments={() => setReload(prev => prev + 1)} focusCount={focusCount} />}
            <CommentsSection postId={postId} showComments={showComments} reload={reload} />
            {showComments && <span className='text-slate-500 underline text-end cursor-pointer' onClick={() => setShowComments(false)}>Close the comments</span>}
        </>
    )
}

export default Index
