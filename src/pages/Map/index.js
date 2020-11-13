import React from 'react';
import NavHeader from '../../components/NavHeader/index';
import styles from './index.module.css';
import { location } from '../../utils';
import axios from 'axios';
const BMapGL = window.BMapGL;

export default class MapIndex extends React.Component {
	constructor(prop) {
		super(prop);
	}

	async componentDidMount() {
		let locationCity = await location();

		this.map = new BMapGL.Map('container');
		this.myGeo = new BMapGL.Geocoder();

		// 将地址解析结果显示在地图上，并调整地图视野
		this.addressResolution(locationCity, 11);

		this.map.enableScrollWheelZoom(true);
	}

	// 地址解析
	addressResolution({ label, value }, zoom) {
		this.myGeo.getPoint(
			label + '市',
			(point) => {
				this.renderMapHouse(value);
				if (point) {
					this.map.centerAndZoom(point, zoom);
					return;
				}
				alert('您选择的地址没有解析到结果！');
			},
			label
		);
	}

	async renderMapHouse(value) {
		let res = await axios.get(`http://localhost:8080/area/map?id=${value}`);
		res.data.body.forEach((item) => {
			const { coord: { latitude, longitude }, value, label: cityName } = item;

			var opts = {
				position: new BMapGL.Point(longitude, latitude), // 指定文本标注所在的地理位置
				offset: new BMapGL.Size(30, -30) // 设置文本偏移量
			};
			// 创建文本标注对象
			var label = new BMapGL.Label(cityName, opts);
			// 自定义文本标注样式
			label.setStyle({
				color: 'blue',
				borderRadius: '5px',
				borderColor: '#ccc',
				padding: '10px',
				fontSize: '16px',
				height: '30px',
				lineHeight: '30px',
				fontFamily: '微软雅黑'
			});

			this.map.addOverlay(label);

			label.addEventListener('click', (e) => {
				let zoom = this.map.getZoom();
				// console.log(zoom);
				if (zoom >= 15) return;

				this.addressResolution(item, zoom + 2);
			});
		});
	}

	render() {
		return (
			<div className={styles.map}>
				<NavHeader children="地图找房" />
				<div id="container" className={styles.container} />
			</div>
		);
	}
}
