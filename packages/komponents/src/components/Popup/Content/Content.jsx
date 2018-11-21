import React from 'react';

import styles from './Content.module.css';

export default ({className = '', style = {}, children}) => (
    <div className={styles.content + ' ' + className} style={style}>
        {children}
    </div>
)
