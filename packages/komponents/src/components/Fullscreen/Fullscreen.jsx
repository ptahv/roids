/**
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 */

import React from 'react';
import ReactDOM from 'react-dom'

import styles from './Fullscreen.module.css';

export default ({modal, children}) => {
    useEffect(() => {
        const node = document.createElement('div');
        
        node.className = [
            styles.screen,
            modal && styles.modal
        ].filter(Boolean);

        document.body.appendChild(node);

        ReactDOM.createPortal(
            children,
            node
        )
        
        return () => {
            if (node) {
                document.body.removeChild(this.node);
                node = null;
            }
        }
    }, []);
        
    return null;
}


// export 

// export default class FullScreen extends React.Component {
//     node = null;

//     constructor() {
//         super();
        
//         if (!this.node) {
//             this.node = document.createElement('div');

//             this.node.className = styles.screen;

//             document.body.appendChild(this.node);
//         }
//     }

//     componentWillUnmount() {
//         if (this.node) {
//             document.body.removeChild(this.node);
//             this.node = null;
//         }
//     }

//     render() {
//         return ReactDOM.createPortal(
//             this.props.children,
//             this.node
//         )
//     }
// }