import React from 'react';

export default ({ children, ...kontexts }) => {
    const kontextKeys = Object.keys(kontexts);
    
    if (!kontextKeys.length)
        return children;

    return kontextKeys.reduce((retVal, key, i) => {
        const Kontext = kontexts[key];

        if (i === 0) return child => (
            <Kontext>
                {(...val) => child({ 
                        // For Higher Order Components
                    [key]: val.length > 1 ? val : val[0] || {} 
                })}
            </Kontext>
        )

        return child => retVal(
            (prevVal) => (
                <Kontext>
                    {(...val) => child(Object.assign({}, prevVal, { 
                        [key]: val.length > 1 ? val : val[0] || {} 
                    }))}
                </Kontext>
            )
        );
    }, c => c)(typeof children === 'function' ? children : () => children)
}