import React from 'react';

export default ({className = '', style = {}, children}) => (
    <div className={'text-center border-top ' + className} style={style}>
        {children}
    </div>
)