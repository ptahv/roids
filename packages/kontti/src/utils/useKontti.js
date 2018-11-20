import React from 'react';

export default (Context) => (...keys) => {
    const store = React.useContext(Context);

    if (!store) 
        return [];
        
    return [
        keys.length && store.get(...keys) || {},
        store.actions
    ];
}