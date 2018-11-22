import React from 'react';

export default ({className = '', style = {}, children}) => (
    <div className={'text-center bg-white border-top px-3 py-2 ' + className} style={style}>
        {children}
    </div>
)