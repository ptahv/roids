import React from 'react';

export default ({
	style = {},
	className = '',
	
	children
}) => (
	<div
		className={'p-1 border-top bg-white ' + className} 
		style={style}
		>
		{children}
	</div>
)