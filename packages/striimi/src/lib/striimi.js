/**
 * Copyright (c) 2015-present, Petri Tahvanainen.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import emitBufferFactory from './emitBufferFactory';

export default (...initValues) => {
	let storedValues = initValues;
	let listeners = [];

    const emitBuffer = emitBufferFactory();
    
	let striimi = Object.assign(() => {
        striimi = null;
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
            
            return striimi;
        }

        const _emit = (values) => {
            storedValues = values;

            if (listeners.length) {
                emitBuffer({
                    values,
                    listeners,
                });
            }

            return striimi;
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

    return striimi;
}
