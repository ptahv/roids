import React from 'react';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';

export default (DxComponent, defaultConfig) => React.forwardRef((props, ref) => {
    const {
        _header,
        _style = {},
        _className = '',

        ...componentProps
    } = props;

    return (
        <div 
            style={_style}
            className={_className} 
            >
            {_header && (
                <h6><small> {_header} </small></h6>
            )}
            <DxComponent
                ref={ref}
                {...Object.assign({}, defaultConfig, componentProps)} 
                />
        </div>
        )
    }
);