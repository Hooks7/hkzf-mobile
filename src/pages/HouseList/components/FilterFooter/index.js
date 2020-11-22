import { useState, useEffect } from 'react';
import style from './index.module.css';

export default function FilterFooter({ closeFilter, confirmFilter, className }) {
	return (
		<div className={[ style.filterFooter, className || '' ].join(' ')}>
			<h2 onClick={closeFilter}>取消</h2>
			<h2 onClick={confirmFilter}>确定</h2>
		</div>
	);
}
