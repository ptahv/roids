/**
 * Copyright (c) 2015-present, Petri Tahvanainen.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default () => {
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