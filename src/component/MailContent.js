import React from 'react'

const MailContent = ({ data: {id, to, subject, content} }) => {
    return (
        <div className="card-mail-detail__content">
            <h4>{ subject }</h4>
            <span>{new Date().toLocaleDateString()}</span>
            <p>From: {to}</p>
            <p>
                {content}
            </p>
        </div>
    )
}

export default MailContent
