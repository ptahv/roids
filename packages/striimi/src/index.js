function emitBufferFactory() {
    let emitBuffer = [];
    let isEmitting = false;

    return ({listeners, values}) => {
        emitBuffer.push({listeners, values});

        if (isEmitting)
            return;

        isEmitting = true;
        while (emitBuffer.length > 0) {
            const {listeners, values} = emitBuffer[0];
            listeners.map(fn => fn(...values));

            emitBuffer.shift();
        }

        isEmitting = false;
    }
}

export const striimi = (...initValues) => {
	let storedValues = initValues;
	let listeners = [];

    const emitBuffer = emitBufferFactory();
    
	let stream = Object.assign(() => {
        stream = null;
        listeners = null;
        storedValues = null;

    }, (() => {
        const _get = () => {
            if (storedValues.length > 1)
                return storedValues;

            return storedValues[0];
        }

        const _set = (...values) => {
            storedValues = values;
            
            return stream;
        }

        const _emit = (values) => {
            storedValues = values;

            if (listeners.length) {
                emitBuffer({
                    values,
                    listeners,
                });
            }

            return stream;
        }

        return {
            subscribe(listener) {
                listeners = listeners.concat(listener);

                listener(...storedValues);

                return () => {
                    listeners = listeners.filter(l => l !== listener);
                }
            },

            listen(listener) {
                listeners = listeners.concat(listener);

                return () => {
                    listeners = listeners.filter(l => l !== listener);	
                }
            },

            emit: (...values) => _emit(values),
            
            refresh: () => _emit(storedValues),
            
            reset: () => _emit(initValues),
            
            getValue: _get,

            getValues: _get,

            /**
             * Undocumented, not intended for using. 
             * Still here if one needs them.. 
             */
            
            setValue: _set, 

            setValues: _set
        }
    })());

    return stream;
}

export default striimi;