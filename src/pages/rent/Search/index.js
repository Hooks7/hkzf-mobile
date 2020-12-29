import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';
import { location } from '../../../utils';
import { request } from '../../../utils/request';

import styles from './index.module.css';

export default class Search extends Component {
	// 当前城市id
	cityId = location().value;

	state = {
		// 搜索框的值
		searchTxt: '',
		tipsList: []
	};

	// 渲染搜索结果列表
	renderTips = () => {
		const { tipsList } = this.state;

		return tipsList.map((item) => (
			<li
				key={item.community}
				className={styles.tip}
				onClick={() => {
					this.props.history.replace('/rent/add', {
						community: item.community,
						communityName: item.communityName
					});
				}}
			>
				{item.communityName}
			</li>
		));
	};

	changeInput = async (val) => {
		this.setState({ searchTxt: val });

		if (!this.inputId) {
			this.inputId = await location();
		}

		if (!val) return this.setState({ tipsList: [] });

		clearTimeout(this.timeId);
		this.timeId = setTimeout(async () => {
			let res = await request.get('/area/community', {
				params: {
					name: val,
					id: this.inputId.value
				}
			});

			this.setState({ tipsList: res.data.body });
		}, 500);
	};

	render() {
		const { history } = this.props;
		const { searchTxt } = this.state;

		return (
			<div className={styles.root}>
				{/* 搜索框 */}
				<SearchBar
					placeholder="请输入小区或地址"
					value={searchTxt}
					showCancelButton={true}
					onCancel={() => history.replace('/rent/add')}
					onChange={this.changeInput}
				/>

				{/* 搜索提示列表 */}
				<ul className={styles.tips}>{this.renderTips()}</ul>
			</div>
		);
	}
}
