export default (provider) => {
    return (values, actions) => 
        provider(values, ({set, get}) => actions({
            set, 
            get, 
            setFn: (v) => () => set(v), 
            getFn: (v) => () => get(v)
        }))
}