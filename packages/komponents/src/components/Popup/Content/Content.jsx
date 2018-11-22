import React from 'react';

import styles from './Content.module.css';

export default ({className = '', style = {}, children}) => (
    <div className={styles.content + ' px-3 py-2 ' + className} style={style}>
        {children}
    </div>
)
