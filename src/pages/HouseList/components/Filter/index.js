import { useState, useEffect } from 'react';
import style from './index.module.css';
import FilterTitle from '../FilterTitle';
import FilterPicker from '../FilterPicker';
import FilterMore from '../FilterMore';
import { request } from 'utils/request';
import { location } from 'utils';

//标题栏点击状态
const titleSelectedStatus = {
	area: false,
	mode: false,
	price: false,
	more: false
};

// 不同菜单的选中值状态对象
const selectedValues = {
	area: [ 'area', 'null' ],
	mode: [ 'null' ],
	price: [ 'null' ],
	more: []
};

const Filter = () => {
	// 选中状态
	const [ titleStatus, setTitleStatus ] = useState(titleSelectedStatus);
	// 遮罩层状态
	const [ mask, setMask ] = useState(false);
	// 筛选条件
	const [ filterList, setFilterList ] = useState({});
	// 当前默认选中的标题
	const [ titleType, setTitleType ] = useState('area');

	useEffect(async () => {
		let { value } = await location();
		let { data: { body: filterList } } = await request.get(`houses/condition?id=${value}`);
		setFilterList(filterList);
	}, []);

	const [ data, setData ] = useState('');
	const [ defaultVal, setDefaultVal ] = useState(selectedValues['area']);
	const [ cols, setCols ] = useState(3);
	// 最后一个筛选条件状态
	const [ filterMoreSta, setFilterMoreSta ] = useState(false);

	const onTitleClick = (type) => {
		setTitleType(type);
		if (type == 'more') {
			setFilterMoreSta(true);
			return;
		}

		const { area, subway, price, rentType } = filterList;

		setMask(true);
		setDefaultVal(selectedValues[type]);

		switch (type) {
			case 'area':
				setData([ area, subway ]);
				break;
			case 'mode':
				setData(rentType);
				break;
			case 'price':
				setData(price);
				break;
		}

		setCols(type !== 'area' ? 1 : 3);
		updateTitleSta(type, true);
	};

	// 关闭筛选
	const closeFilter = () => {
		if (filterMoreSta) {
			setFilterMoreSta(false);
			return;
		}

		setMask(false);
		updateTitleSta(titleType);
	};

	// 确定筛选
	const confirmFilter = (selVal) => {
		setMask(false);

		selectedValues[titleType] = selVal;
		updateTitleSta(titleType);
	};

	// 顶部筛选状态更新
	const updateTitleSta = (type, sta) => {
		for (const key in selectedValues) {
			if (key == type && sta) {
				titleSelectedStatus[type] = true;
				continue;
			}

			let selectedVal = selectedValues[key];
			if (key == 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
				//有值area选中
				titleSelectedStatus[key] = true;
			} else if (key == 'mode' && selectedVal[0] !== 'null') {
				//有值mode应该选中
				titleSelectedStatus[key] = true;
			} else if (key == 'price' && selectedVal[0] !== 'null') {
				//有值 price应该选中
				titleSelectedStatus[key] = true;
			} else if (key == 'more' && selectedVal.length != 0) {
				//more有值应该选中
				//  more要选中
			} else {
				titleSelectedStatus[key] = false; //没有值 不选中
			}
		}

		setTitleStatus(titleSelectedStatus);
	};

	return (
		<div>
			{/* 遮罩层 */}
			{mask && <div className={style.mask} onClick={closeFilter} />}

			<div className={style.filter}>
				<FilterTitle titleStatus={titleStatus} onTitleClick={onTitleClick} />

				{mask && (
					<FilterPicker
						key={titleType}
						data={data}
						cols={cols}
						defaultVal={defaultVal}
						closeFilter={closeFilter}
						confirmFilter={confirmFilter}
					/>
				)}
			</div>

			{filterMoreSta && (
				<FilterMore filterList={filterList} filterMoreSta={filterMoreSta} closeFilter={closeFilter} />
			)}
		</div>
	);
};

export default Filter;
