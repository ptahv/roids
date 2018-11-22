export default (provider) => {
    return (values, actions) => 
        provider(values, (a) => actions({
            setFn: (v) => () => a.set(v), 
            getFn: (v) => () => a.get(v),
            ...a
        }))
}