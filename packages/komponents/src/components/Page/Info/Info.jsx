import React from 'react';

export default ({
	style = {},
	className = '',
	
    children
}) => (
	<div 
		className={'position-relative w-100 bg-white p-2 ' + className}
		style={style}
		>
		{children}
	</div>
)