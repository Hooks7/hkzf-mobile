import React from 'react';
import { Carousel } from 'antd-mobile';

import axios from 'axios';

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

	renderSwiper() {
		return this.state.swiper.map((val) => (
			<a
				key={val.imgSrc}
				href="http://www.alipay.com"
				style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
			>
				<img
					src={`http://localhost:8080${val.imgSrc}`}
					style={{ width: '100%', verticalAlign: 'top' }}
					onLoad={() => {
						// fire window resize event to change height
						window.dispatchEvent(new Event('resize'));
						this.setState({ imgHeight: 'auto' });
					}}
				/>
			</a>
		));
	}

	render() {
		return (
			<Carousel
				autoplay={this.state.autoplay}
				infinite
				beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
				afterChange={(index) => console.log('slide to', index)}
			>
				{this.renderSwiper()}
			</Carousel>
		);
	}
}
