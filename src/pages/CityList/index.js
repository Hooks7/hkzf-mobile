import React from 'react';
import axios from 'axios';
import { location } from '../../utils';
import { AutoSizer, List } from 'react-virtualized';
import { Toast } from 'antd-mobile';
import './index.scss';
import NavHeader from '../../components/NavHeader';

const cutCityList = [ '北京', '上海', '广州', '深圳' ];

export default class CityList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cityList: [],
			cityIndexList: {},
			cityLetterList: [],
			activeIndex: 0
		};
	}
	listRef = React.createRef();

	rowRenderer = ({
		key, // Unique key within array of rows
		index, // 索引号
		isScrolling, // 当前项是否正在滚动中
		isVisible, // 当前项在List中是可见的
		style // 重点属性：一定要给每一个行数添加该样式
	}) => {
		let word = this.state.cityLetterList[index];
		let item = this.state.cityIndexList[word];
		return (
			<div key={key} style={style}>
				<p className="title">{word.toUpperCase()}</p>
				{item.map((e) => (
					<p
						className="name"
						key={e.value}
						onClick={() => {
							let cityName = e.label;
							if (cutCityList.indexOf(cityName) >= 0) {
								localStorage.setItem('city', JSON.stringify(e));
								this.props.history.push('/home');
								return;
							}

							Toast.info('当前城市没有房源', 1);
						}}
					>
						{e.label}
					</p>
				))}
			</div>
		);
	};

	async componentDidMount() {
		// 所有城市
		let res = await axios.get('http://localhost:8080/area/city?level=1');
		// 热门城市
		let hotCity = await axios.get('http://localhost:8080/area/hot');

		this.setState({ cityList: res.data.body });

		let cityIndexList = {};
		this.state.cityList.forEach((e) => {
			if (cityIndexList[e.short.slice(0, 1)]) {
				cityIndexList[e.short.slice(0, 1)].push(e);
				return;
			}
			cityIndexList[e.short.slice(0, 1)] = [ e ];
		});

		let cityLetterList = Object.keys(cityIndexList).sort();
		cityLetterList.unshift('热门城市');
		cityIndexList['热门城市'] = hotCity.data.body;
		cityLetterList.unshift('当前定位');
		let locationCity = await location();
		cityIndexList['当前定位'] = [ locationCity ];

		this.setState({ cityLetterList, cityIndexList });
	}

	rowHeight = ({ index }) => {
		let word = this.state.cityLetterList[index];

		return 36 + 50 * this.state.cityIndexList[word].length;
	};

	timeout;
	// 滚动渲染
	rowsRender = ({ startIndex, stopIndex }) => {
		// console.log(startIndex);
		if (this.timeout) return;
		this.timeout = setTimeout(() => {
			this.setState({ activeIndex: startIndex });
			this.timeout = null;
		}, 0);
	};

	// 渲染右侧城市索引
	renderCityIdx = () => {
		return this.state.cityLetterList.map((item, index) => {
			item == '当前定位' && (item = '#');
			item == '热门城市' && (item = '热');
			return (
				<p
					key={item}
					className={this.state.activeIndex == index ? 'active item' : 'item'}
					onClick={() => {
						this.listRef.current.scrollToRow(index);
					}}
				>
					{item.toUpperCase()}
				</p>
			);
		});
	};

	render() {
		return (
			<div className="cityName">
				<NavHeader children="城市选择" />
				<AutoSizer>
					{({ width, height }) => (
						<List
							ref={this.listRef}
							// 组件的宽度
							width={width}
							// 组件的高度
							height={height}
							rowCount={this.state.cityLetterList.length} // 渲染总条数
							// 每行的高度
							rowHeight={this.rowHeight}
							rowRenderer={this.rowRenderer} //渲染每行的内容
							onRowsRendered={this.rowsRender}
							scrollToAlignment="start"
						/>
					)}
				</AutoSizer>
				{/* 城市右侧索引 */}
				<div className="cityLetterList">{this.renderCityIdx()}</div>
			</div>
		);
	}
}
