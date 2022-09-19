import React from 'react'

const MailContent = ({ data: { id, to, subject, content, createdAt } }) => {
    return (
        <div className="card-mail-detail__content">
            <h4>{subject}</h4>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
            <p>From: {to}</p>
            <p>
                {content}
            </p>
        </div>
    )
}

export default MailContent
