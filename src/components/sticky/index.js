import React from 'react';
import propTypes from 'prop-types';

const filter = React.createRef();

export default class Sticky extends React.Component {
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	// 在组件卸载时，解绑事件
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = (e) => {
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		if (scrollTop >= this.props.height) {
			filter.current.style.position = 'fixed';
			return;
		}
		filter.current.style.position = 'static';
	};

	render() {
		return (
			<div ref={filter} style={{ position: 'static', top: 0, left: 0, width: '100%', zIndex: 99 }}>
				{this.props.children}
			</div>
		);
	}
}

Sticky.propTypes = {
	height: propTypes.number.isRequired
};
