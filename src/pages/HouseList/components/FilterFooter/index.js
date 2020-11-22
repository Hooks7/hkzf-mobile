import { useState, useEffect } from 'react';
import style from './index.module.css';

<<<<<<< HEAD
export default function FilterFooter({ closeFilter, confirmFilter, className }) {
	return (
		<div className={[ style.filterFooter, className || '' ].join(' ')}>
			<h2 onClick={closeFilter}>取消</h2>
=======
export default function FilterFooter({ closeFilter, confirmFilter, className, clearFilter }) {
	return (
		<div className={[ style.filterFooter, className || '' ].join(' ')}>
			{className ? <h2 onClick={clearFilter}>清除</h2> : <h2 onClick={closeFilter}>取消</h2>}
>>>>>>> 22ead20... filter update
			<h2 onClick={confirmFilter}>确定</h2>
		</div>
	);
}
