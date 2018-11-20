import * as localforage from 'localforage';

const HOLVI_PREFIX = '__HOLVI__';

function upperFirst(str) {
    return str[0].toUpperCase() + str.substring(1);
}

export default Object.assign((nameSuffix, items) => {
    const holvi = localforage.createInstance({
        name: HOLVI_PREFIX + nameSuffix,
        driver: localforage.INDEXEDDB
    });

    return Object.keys(items).reduce((retVal, key) => Object.assign({}, retVal, 
        (() => {
            const name = upperFirst(key);

            let _dataPromise = null;

            return {
                ['fetch' + name]: () => holvi.getItem(key)
                    .then((data) => {
                        if (data !== null)
                            return data;
    
                        if (_dataPromise !== null)
                            return _dataPromise;
    
                        _dataPromise = items[key]()
                            .then(data => { 
                                _dataPromise = null;
                                
                                if (data != null)
                                    return holvi.setItem(key, data);
                                    
                                return data;
                            })
    
                        return _dataPromise;
                    }),

                ['remove' + name]: () => {
                    _dataPromise = null;
                    return holvi.removeItem(key);
                }
            }
        })()), { 
            clear: holvi.clear 
        })
}, {
    clear: () => localforage.clear
})
