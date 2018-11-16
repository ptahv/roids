import React from 'react';

import styles from './Content.module.css';

export default ({className = '', style = {}, children}) => (
    <div className={styles.content + ' p-1 ' + className} style={style}>
        {children}
    </div>
)
