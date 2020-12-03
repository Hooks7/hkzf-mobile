import SearchHeader from 'components/SearchHeader';
import { location } from 'utils';
import { useState, useEffect } from 'react';
import Filter from './components/Filter/index';
import styles from './index.module.css';
import { request } from 'utils/request';
import { Toast } from 'antd-mobile';
import { WindowScroller, AutoSizer, List, InfiniteLoader } from 'react-virtualized';
import HouseItem from 'components/HouseItem';
import Sticky from 'components/sticky';

export default function HouseList() {
	const [ locationCity, setLocationCity ] = useState({});
	const [ houseList, setHouseList ] = useState([]);
	const [ count, setCount ] = useState(0);

	let houseListParams = {};

	useEffect(async () => {
		let res = await location();
		setLocationCity(res);

		requestHouseList();
	}, []);

	const onFilter = (val) => {
		houseListParams = val;
		requestHouseList();
	};

	const requestHouseList = async () => {
		Toast.loading('加载中...');
		let res = await request('http://localhost:8080/houses', {
			params: {
				cityId: locationCity.value,
				...houseListParams,
				start: 1,
				end: 20
			}
		});

		setHouseList(res.data.body.list);
		setCount(res.data.body.count);

		Toast.hide();
	};

	const renderHouseList = ({ key, index, style }) => {
		let item = houseList[index];

		return <HouseItem item={item} key={key} style={style} />;
	};

	const isRowLoaded = ({ index }) => {
		return !!houseList[index];
	};

	const loadMoreRows = ({ startIndex, stopIndex }) => {
		return new Promise((resolve) => {
			request
				.get('/houses', {
					params: {
						cityId: locationCity.value,
						...houseListParams,
						start: startIndex,
						end: stopIndex
					}
				})
				.then((res) => {
					setHouseList([ ...houseList, ...res.data.body.list ]);
					// 加载数据完成时，调用resolve即可
					resolve();
				});
		});
	};

	return (
		<div className={styles.page}>
			<SearchHeader locationCity={locationCity.label || ''} className={styles.header} />
			<Sticky height={54}>
				<Filter onFilter={onFilter} />
			</Sticky>

			<InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={count}>
				{({ onRowsRendered, registerChild }) => (
					<WindowScroller>
						{({ height, isScrolling, scrollTop }) => (
							<AutoSizer>
								{({ width }) => {
									return (
										<List
											className={styles.list}
											onRowsRendered={onRowsRendered}
											ref={registerChild}
											autoHeight
											height={height}
											isScrolling={isScrolling}
											scrollTop={scrollTop}
											rowCount={count}
											// 每行的高度
											rowHeight={120}
											rowRenderer={renderHouseList}
											width={width}
										/>
									);
								}}
							</AutoSizer>
						)}
					</WindowScroller>
				)}
			</InfiniteLoader>
		</div>
	);
}
