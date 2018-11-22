export default (propClassNames, baseClassName = '') => ({
    className,
    ...props
} = {}, addtClassName = '') => { 
    const propKeys = Object.keys(props);
    const propClassNameKeys = Object.keys(propClassNames)

    return {
        className: [
            baseClassName,
            className,
            addtClassName
        ].concat(propKeys
            .filter(p => propClassNameKeys.includes(p))
            .map(p => propClassNames[p])
        ).filter(Boolean).join(' '),

        ...propKeys.reduce((retVal, key) => {
            if (!propClassNameKeys.includes(key))
                retVal[key] = props[key];

            return retVal;
        }, {})
    }
}