import React from 'react';
import ReactDOM from 'react-dom'
 
import Popup from '../Popup/Popup.jsx';
import styles from './confirmPopup.module.css';

export default ({
    value,
    onSuccess,
    onCancel,

    confirmText = 'Confirm',
    acceptText = 'Accept',
    cancelText = 'Cancel',

    style = {},
    className = '',
}) => {
    
    const node = document.createElement('div');
    document.body.appendChild(node);

    const handleSuccess = () => {
        document.body.removeChild(node);
        
        if (onSuccess)
            onSuccess();
    }

    const handleCancel = () => {
        document.body.removeChild(node);
        
        if (onCancel)
            onCancel();
    }

    render(
        <Popup header={confirmText} onClose={onCancel}>
            <div 
                className={styles.container + ' ' + className}
                style={style}
                >
                {value}
            </div>

            <button
                type='button'
                className='btn btn-primary'
                value={acceptText}
                onClick={handleSuccess}
                />

            <button
                type='button'
                className='btn btn-link'
                value={locales.cancel}
                onClick={handleCancel}
                />
        </Popup>,
        
        node
    )
}