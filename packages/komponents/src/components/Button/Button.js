import React from 'react' ;
import classNamesBuilder from 'class-names-builder';

const cnBuilder = classNamesBuilder({
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    warning: 'btn-warning',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark',
    link: 'btn-link',
    'outline-primary' : 'btn-outline-primary',
    'outline-secondary' : 'btn-outline-secondary',
    'outline-success' : 'btn-outline-success',
    'outline-danger' : 'btn-outline-danger',
    'outline-warning' : 'btn-outline-warning',
    'outline-info' : 'btn-outline-info',
    'outline-light' : 'btn-outline-light',
    'outline-dark' : 'btn-outline-dark',
    'outline-link' : 'btn-outline-link',
    large: 'btn-lg',
    small: 'btn-sm',
    block: 'btn-block',
    active: 'active',
    close: 'close',
}, 'btn')

export default ({type = 'button', ...props}) => (
    <button type={type} {...cnBuilder(props)} />
)

