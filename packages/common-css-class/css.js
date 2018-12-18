import v from './variables.js';

import common from './js/common.js';

export default (css = {}, variables = {}) => Object.assign({},
    common(Object.assign({}, v, variables)),
    css
)