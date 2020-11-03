import React from 'react';
import { Carousel, Flex, WhiteSpace } from 'antd-mobile';

import './index.scss';

import axios from 'axios';

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
		autoplay: false
	};

	async componentDidMount() {
		let res = await axios.get('http://localhost:8080/home/swiper');
		this.setState({ swiper: res.data.body }, () => {
			this.setState({ autoplay: true });
		});
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
					src={`http://localhost:8080${val.imgSrc}`}
					style={{ width: '100%', verticalAlign: 'top' }}
					onLoad={() => {
						window.dispatchEvent(new Event('resize'));
						this.setState({ imgHeight: 'auto' });
					}}
				/>
			</a>
		));
	}

	renderNavMenu() {
		return menus.map((item) => (
			<Flex.Item key={item.name}
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

	render() {
		return (
			<div>
				<Carousel autoplay={this.state.autoplay} infinite>
					{this.renderSwiper()}
				</Carousel>
				<div className="NavMenu">
					<Flex>{this.renderNavMenu()}</Flex>
				</div>
			</div>
		);
	}
}
