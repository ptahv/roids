import React from 'react';

import Button from '../Button/Button.js';

import classNamesBuilder from 'class-names-builder';

const tabBuilder = classNamesBuilder({
    primary: 'border-primary',
    secondary: 'border-secondary',
    success: 'border-success',
    danger: 'border-danger',
    warning: 'border-warning',
    info: 'border-info',
    light: 'border-light',
    dark: 'border-dark',
    white: 'border-white'
}, 'border-bottom float-left');

const btnBuilder = classNamesBuilder({
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning',
    info: 'text-info',
    light: 'text-light',
    dark: 'text-dark',
    white: 'text-white'
});

export default ({
    isActive = false, 
    isDisabled = false, 

    color,

    style = {}, 
    className = '',
    
    children,

    ...props
}) => (
    <div className={tabBuilder(props).className} style={Object.assign({}, 
            { borderBottomWidth: 3 },
            color && { borderColor: color },
            !isActive && { borderColor: 'transparent' }
        )}>
        <Button 
            link 
            style={Object.assign({}, 
                color && { color }, 
                isActive && { fontWeight: 'bold' },
                isDisabled && {
                    pointerEvents: 'none',
                    opacity: .65
                }
            )}
            {...btnBuilder(props)}
            >
            {children}
        </Button>
</div>
)
{/*  */}