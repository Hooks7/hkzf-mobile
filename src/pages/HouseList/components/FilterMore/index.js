import React, { Component } from 'react';

import FilterFooter from '../FilterFooter';

import styles from './index.module.css';

export default class FilterMore extends Component {
	constructor(props) {
		super(props);
		this.state = { hh: '123' };
	}

	// 渲染标签
	renderFilters(mydata) {
		// 高亮类名： styles.tagActive  item.value是id
		return mydata.map((item) => {
			return (
				<span key={item.value} className={[ styles.tag, styles.tagActive ].join(' ')}>
					{item.label}
				</span>
			);
		});
	}

	render() {
		let { filterList: { characteristic, floor, oriented, roomType }, closeFilter } = this.props;

		return (
			<div className={styles.root}>
				{/* 遮罩层 */}
				<div className={styles.mask} onClick={closeFilter} />

				{/* 条件内容 */}
				<div className={styles.tags}>
					<dl className={styles.dl}>
						<dt className={styles.dt}>户型</dt>
						<dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

						<dt className={styles.dt}>朝向</dt>
						<dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

						<dt className={styles.dt}>楼层</dt>
						<dd className={styles.dd}>{this.renderFilters(floor)}</dd>

						<dt className={styles.dt}>房屋亮点</dt>
						<dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
					</dl>
				</div>

				{/* 底部按钮 */}
				<FilterFooter className={styles.footer} closeFilter={closeFilter} />
			</div>
		);
	}
}
