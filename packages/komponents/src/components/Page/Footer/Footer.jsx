import React from 'react';

export default ({
	style = {},
	className = '',
	
	children
}) => (
	<div
		className={'px-3 py-2 border-top position-relative ' + className} 
		style={style}
		>
		{children}
	</div>
)