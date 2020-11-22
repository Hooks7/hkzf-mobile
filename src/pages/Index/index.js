import React from 'react';
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import './index.scss';
import { location } from '../../utils';
import { baseURL } from '../../utils/baseUrl';
import { request } from '../../utils/request';

import SearchHeader from 'components/SearchHeader';
import styles from './index.module.css';

import nav1 from '../../assets/images/nav-1.png';
import nav2 from '../../assets/images/nav-2.png';
import nav3 from '../../assets/images/nav-3.png';
import nav4 from '../../assets/images/nav-4.png';

// 导航菜单的数据
const menus = [
	{ name: '整租', imgSrc: nav1, path: '/home/houselist' },
	{ name: '合租', imgSrc: nav2, path: '/home/houselist' },
	{ name: '地图找房', imgSrc: nav3, path: '/map' },
	{ name: '去出租', imgSrc: nav4, path: '/rent/add' }
];

export default class Index extends React.Component {
	state = {
		swiper: [],
		imgHeight: 176,
		news: [],
		autoplay: false
	};

	async componentDidMount() {
		let res = await request.get('home/swiper');
		let newsRes = await request.get('home/news?area=AREA%7C88cff55c-aaa4-e2e0');
		let result = await request.get('home/groups?area=AREA%7C88cff55c-aaa4-e2e0');

		this.setState({ swiper: res.data.body, news: newsRes.data.body, groups: result.data.body }, () => {
			this.setState({ autoplay: true });
		});
		let pin = await location();
		this.setState({ locationCity: pin.label });
	}

	// 轮播图渲染
	renderSwiper() {
		return this.state.swiper.map((val) => (
			<a
				key={val.imgSrc}
				// href="http://www.alipay.com"
				style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
			>
				<img
					src={baseURL + val.imgSrc}
					style={{ width: '100%', verticalAlign: 'top' }}
					onLoad={() => {
						window.dispatchEvent(new Event('resize'));
						this.setState({ imgHeight: 'auto' });
					}}
				/>
			</a>
		));
	}

	// 渲染租房小组
	renderNavMenu() {
		return menus.map((item) => (
			<Flex.Item
				key={item.name}
				onClick={() => {
					this.props.history.push(item.path);
				}}
			>
				<Flex direction="column">
					<img src={item.imgSrc} style={{ width: '48px' }} />
					<span>{item.name}</span>
				</Flex>
			</Flex.Item>
		));
	}

	// 渲染最新资讯
	renderNews() {
		return this.state.news.map((item) => (
			<div className="news-item" key={item.id}>
				<div className="imgwrap">
					<img className="img" src={baseURL + item.imgSrc} alt="" />
				</div>
				<Flex className="content" direction="column" justify="between">
					<h3 className="title">{item.title}</h3>
					<Flex className="info" justify="between">
						<span>{item.from}</span>
						<span>{item.date}</span>
					</Flex>
				</Flex>
			</div>
		));
	}

	render() {
		return (
			<div>
				<Carousel autoplay={this.state.autoplay} infinite>
					{this.renderSwiper()}
				</Carousel>
				<div className="NavMenu">
					<Flex>{this.renderNavMenu()}</Flex>
				</div>
				<div className="groups">
					<div className="groups-title">
						<h3>租房小组</h3>
						<span>更多</span>
					</div>
					{/* rendeItem 属性：用来 自定义 每一个单元格中的结构 */}
					<Grid
						data={this.state.groups}
						columnNum={2}
						square={false}
						activeStyle
						hasLine={false}
						renderItem={(item) => (
							<Flex className="grid-item" justify="between">
								<div className="desc">
									<h3>{item.title}</h3>
									<p>{item.desc}</p>
								</div>
								<img src={`http://localhost:8080${item.imgSrc}`} alt="" />
							</Flex>
						)}
					/>
				</div>

				<div className="news">
					<h3 className="group-title">最新资讯</h3>
					<WingBlank size="md"> {this.renderNews()}</WingBlank>
				</div>

				<SearchHeader className={styles.searchHeader} locationCity={this.state.locationCity} />
			</div>
		);
	}
}
