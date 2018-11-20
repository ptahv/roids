import React from 'react';

export default ({
	style = {},
	className = '',
	
	children
}) => (
	<div
		className={'p-2 border-top bg-white ' + className} 
		style={style}
		>
		{children}
	</div>
)