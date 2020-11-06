import React from 'react';
import './index.scss';
import { NavBar, Icon } from 'antd-mobile';

export default class MapIndex extends React.Component {
	constructor(prop) {
		super(prop);
	}

	componentDidMount() {
		var map = new window.BMapGL.Map('container');
		var point = new window.BMapGL.Point(116.404, 39.915);
		map.centerAndZoom(point, 15);
	}

	render() {
		return (
			<div className="map">
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.go(-1)}>
					地图找房
				</NavBar>
				<div id="container" />
			</div>
		);
	}
}
