import React from 'react';

function createPropsCreator(
    className = '', 
    propClassNames = {}, 
) {
    return (props) => {
        const propKeys = Object.keys(props);
        const propClassNameKeys = Object.keys(propClassNames)

        return {
            className: className + ' ' + propKeys
                .filter(p => propClassNameKeys.includes(p))
                .map(p => propClassNames[p])
                .join(' '),

            ...propKeys.reduce((retVal, key) => {
                if (!propClassNameKeys.includes(key))
                    retVal[key] = props[key];

                return retVal;
            }, {})
        }
    }
}

export default ({
    elem = 'div',
    className,
    propClassNames, 
    childComponents
}) => {
    const propsCreator = createPropsCreator(className, propClassNames);
    
    const Component = ({children, ...props}) => React.createElement(
        elem,
        propsCreator(props),
        children
    )

    return Object.assign(Component, childComponents);
}