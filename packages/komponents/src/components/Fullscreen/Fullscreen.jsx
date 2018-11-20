import React from 'react';
import ReactDOM from 'react-dom'

import styles from './Fullscreen.module.css';

export default ({modal, children}) => {
    const node = document.createElement('div');
        
    node.className = [
        styles.screen,
        modal && styles.modal
    ].filter(Boolean).join(' ');

    document.body.appendChild(node);

    React.useEffect(() => () => 
        node && document.body.removeChild(node)
    , []);
        
    return ReactDOM.createPortal(
        children,
        node
    );
}
