import React from 'react';
import NavHeader from '../../components/NavHeader/index';
import styles from './index.module.css';
import { location } from '../../utils';

import { Toast } from 'antd-mobile';
import axios from 'axios';
const BMapGL = window.BMapGL;

export default class MapIndex extends React.Component {
	state = {
		houseList: [],
		isShow: false
	};

	async componentDidMount() {
		let locationCity = await location();

		this.map = new BMapGL.Map('container');
		this.myGeo = new BMapGL.Geocoder();

		// 将地址解析结果显示在地图上，并调整地图视野
		this.addressResolution(locationCity, 11);
		this.map.enableScrollWheelZoom(true);
		this.map.addControl(new BMapGL.NavigationControl());
		this.map.addControl(new BMapGL.ScaleControl());
		this.map.addControl(new BMapGL.MapTypeControl());
		this.map.addEventListener('movestart', (e) => {
			this.setState({ isShow: false });
		});
	}

	// 地址解析
	addressResolution({ label, value }, zoom) {
		this.myGeo.getPoint(
			label,
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

	renderHouseList = () => {
		return this.state.houseList.map((item) => (
			<div
				className={styles.house}
				key={item.title}
				onClick={() => {
					this.props.history.push(`/detail/${item.houseCode}`);
				}}
			>
				<div className={styles.imgWrap}>
					<img className={styles.img} src={`http://localhost:8080${item.houseImg}`} alt="" />
				</div>
				<div className={styles.content}>
					<h3 className={styles.title}>{item.title}</h3>
					<div className={styles.desc}>{item.desc}</div>
					<div>
						{/* ['近地铁', '随时看房'] */}
						{item.tags.map((e) => {
							return (
								<span className={[ styles.tag, styles.tag1 ].join(' ')} key={e}>
									{e}
								</span>
							);
						})}
					</div>
					<div className={styles.price}>
						<span className={styles.priceNum}>{item.price}</span> 元/月
					</div>
				</div>
			</div>
		));
	};

	async renderMapHouse(value) {
		Toast.loading('Loading...');
		let res = await axios.get(`http://localhost:8080/area/map?id=${value}`);
		Toast.hide();

		res.data.body.forEach((item) => {
			const { coord: { latitude, longitude }, value, label: cityName, count } = item;

			var opts = {
				position: new BMapGL.Point(longitude, latitude), // 指定文本标注所在的地理位置
				offset: new BMapGL.Size(0, 0) // 设置文本偏移量
			};

			// 当前缩放级别
			this.zoom = this.map.getZoom();

			// 创建文本标注对象
			var label = new BMapGL.Label('', opts);

			label.setContent(`
				<div class="${this.zoom < 14 ? styles.bubble : styles.zoom}">
					<p class="${styles.name}">${cityName}</p>
					<p>${count}套</p>
				</div>`);

			// 自定义文本标注样式
			label.setStyle({
				cursor: 'pointer',
				border: 'none',
				background: 'none'
			});

			this.map.addOverlay(label);

			label.addEventListener('click', async (e) => {
				console.log(this.zoom);
				if (this.zoom < 14) {
					// 清除覆盖物
					this.map.clearOverlays();
					this.renderMapHouse(value);
					this.map.centerAndZoom(opts.position, this.zoom + 2);
					return;
				}
				Toast.loading('Loading...');

				let y = (window.innerHeight - 330) / 2 - e.domEvent.changedTouches[0].clientY;
				let x = window.innerWidth / 2 - e.domEvent.changedTouches[0].clientX;
				this.map.panBy(x, y);

				let res = await axios.get(`http://localhost:8080/houses?cityId=${value}`);

				this.setState({ houseList: res.data.body.list, isShow: true });
				Toast.hide();
			});
		});
	}

	render() {
		return (
			<div className={styles.map}>
				<NavHeader children="地图找房" />
				<div id="container" className={styles.container} />

				<div className={[ styles.houseList, this.state.isShow ? styles.show : '' ].join(' ')}>
					<div className={styles.titleWrap}>
						<h1 className={styles.listTitle}>房屋列表</h1>
						<a className={styles.titleMore} href="/house/list">
							更多房源
						</a>
					</div>
					<div className={styles.houseItems}>{this.renderHouseList()}</div>
				</div>
			</div>
		);
	}
}
