import SearchHeader from 'components/SearchHeader';
import { location } from 'utils';
import { useState, useEffect } from 'react';
import Filter from './components/Filter/index';
import style from './index.module.css';

export default function HouseList() {
	const [ locationCity, setLocationCity ] = useState('');

	useEffect(async () => {
		let res = await location();
		setLocationCity(res.label);
	}, []);

	
	return (
		<div className={style.page}>
			<SearchHeader locationCity={locationCity} />
			<Filter />
		</div>
	);
}
