import React from 'react'

function ErrorMessage({ isCheck, message }) {
    if (!isCheck) return null
    return (
        <>
            <div id="validationServer03Feedback" class="invalid-feedback">
                {message}
            </div>
        </>
    )
}
export default ErrorMessage;