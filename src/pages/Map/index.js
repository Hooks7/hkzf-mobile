import React from 'react';
import './index.scss';
import NavHeader from '../../components/NavHeader/index';

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
				<NavHeader children="地图找房" />
				<div id="container" />
			</div>
		);
	}
}
