import React from 'react';

import defaultConfig from './default.config.js';

export default (() => {
    let config = defaultConfig;

    return Object.assign((DxComponent) => React.forwardRef((props, ref) => {
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
                    <h6 className='m-0'><small> {_header} </small></h6>
                )}
                <DxComponent
                    ref={ref}
                    {...Object.assign({}, config[DxComponent.name], componentProps)} 
                    />
            </div>
            )
        }), 
        { setConfig: (c) => {config = c} }
    );
})();