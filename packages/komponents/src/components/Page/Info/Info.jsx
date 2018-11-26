import React from 'react';

export default ({
	style = {},
	className = '',
	
    children
}) => (
	<div 
		className={'w-100 px-3 py-2 position-relative bg-secondary ' + className}
		style={style}
		>
		{children}
	</div>
)