import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faTrash, faThumbTack } from '@fortawesome/free-solid-svg-icons'

export const MailBox = ({ data, onChange, onDelete, flag, pin, onFlag, onPin }) => {
    const checkFlag = () => {
        return flag?.find(item => item === data.id);
    }

    const checkPin = () => {
        return pin?.find(item => item.id === data.id);
    }

    return (
        <div className="mail-box">
            <div className={`card-mail__content ${checkFlag() && "border-check-flag"} `} onClick={() => onChange(data.id)}>
                <div className="card-email__top">
                    <span className="card-email__top--title">{data.to}</span>

                </div>
                <div className="card-email-desc">
                    {data.subject}
                </div>
            </div>
            <div className="group-button-email">
                <button className={checkFlag() && "button-check-flag"} onClick={() => onFlag(data.id)}>
                    <FontAwesomeIcon icon={faFlag} color="#fff" />
                </button>
                <button className={checkPin() && "button-check-flag"} onClick={() => onPin(data)}>
                    <FontAwesomeIcon icon={faThumbTack} color="#fff" />
                </button>
                <button className="" onClick={() => onDelete(data.id)}>
                    <FontAwesomeIcon icon={faTrash} color="#fff" />
                </button>
            </div>
        </div>
    )
}
