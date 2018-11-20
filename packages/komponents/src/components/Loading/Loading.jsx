import React from 'react';

import styles from './Loading.module.css';

import FullScreen from '../FullScreen/FullScreen.jsx';

/* Props
    - relative
    - enableClickThrough
*/

const WithFullScreen = ({relative, children}) => relative
    ? children
    : <FullScreen>{children}</FullScreen>

export default ({
    relative,
    enableClickThrough
}) => (
    <WithFullScreen relative={relative}>
        <div className='w-100 h-100' style={{
            pointerEvents: enableClickThrough ? 'none' : 'auto'
        }}>
            <div className={styles.container}>
                <div className={styles.icon}>...</div> 
            </div>
        </div> 
    </WithFullScreen>
)