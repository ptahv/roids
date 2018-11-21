import React from 'react';

import Fullscreen from '../Fullscreen/Fullscreen.jsx';

import styles from './Popup.module.css';

import Content from './Content/Content.jsx';
import Footer from './Footer/Footer.jsx';

export default Object.assign(({
    header, 

    onClose,

    style = {},
    className = '',

    children
}) => (
    <Fullscreen modal>
        <div 
            className='w-100 h-100'
            onClick={onClose}
            >
            <div 
                className={styles.container + ' shadow-sm ' + className}
                onClick={e => e.stopPropagation()}
                style={style}
                >

                {onClose && (
                    <button 
                        type='button'
                        className={'close ' + styles.closeButton}
                        onClick={onClose} />
                )}

                {header && (
                    <div className='bg-white px-3 py-2 m-0 border-bottom'> 
                        <h5 className='m-0'>{header}</h5>
                    </div>
                )}
                {children}
            </div>
        </div>
    </Fullscreen>
), {
    Content,
    Footer
});