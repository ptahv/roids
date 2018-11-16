import React from 'react';

import styles from './Content.module.css';

export default ({
	style = {},
	className = '',
	
	onScrollBottom,

    children
}) => (
	<div 
		style={style}
		className={styles.container + ' ' + className}
		onScroll={!onScrollBottom ? null : (e) => {
			const {target} = e;
		
			if (!target) 
				return null;
		
			const scrollHeight = target.scrollHeight - target.offsetHeight;
		
			if (scrollHeight - target.scrollTop <= 200) {
				onScrollBottom(e);
			}
		}}>
		{children}

		<div className={styles.shadowContainer}>
			<div className={styles.shadow}></div>
		</div>
	</div>
)