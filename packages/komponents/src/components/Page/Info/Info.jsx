import React from 'react';

export default ({
	style = {},
	className = '',
	
    children
}) => (
	<div 
		className={'position-relative w-100 bg-white' + className}
		style={style}
		>
		{children}
	</div>
)