import React, { Component } from 'react';
import FilterFooter from '../FilterFooter';
import styles from './index.module.css';

export default class FilterMore extends Component {
	constructor(props) {
		super(props);
		this.state = { more: this.props.defaultVal };
	}

	// 渲染标签
	renderFilters(mydata, type) {
		let { more } = this.state;

		return mydata.map((item) => {
			return (
				<span
					key={item.value}
					className={[ styles.tag, more.indexOf(item.value) >= 0 ? styles.tagActive : '' ].join(' ')}
					onClick={() => {
						let newMore = [ ...more ];
						let select = type === true || false; // 是否多选
						let index = newMore.indexOf(item.value);

						let newMoreIdx = type === 'roomType' ? 0 : type === 'oriented' ? 1 : 2;

						if (!select) {
							if (newMore[newMoreIdx] != item.value) {
								newMore[newMoreIdx] = item.value;
							} else {
								newMore[newMoreIdx] = '';
							}
						} else {
							index >= 0 ? newMore.splice(index, 1) : newMore.push(item.value);
						}

						this.setState({ more: newMore });
					}}
				>
					{item.label}
				</span>
			);
		});
	}

	render() {
		let { filterList: { characteristic, floor, oriented, roomType }, closeFilter, confirmFilter } = this.props;

		return (
			<div className={styles.root}>
				{/* 遮罩层 */}
				<div className={styles.mask} onClick={closeFilter} />

				{/* 条件内容 */}
				<div className={styles.tags}>
					<dl className={styles.dl}>
						<dt className={styles.dt}>户型</dt>
						<dd className={styles.dd}>{this.renderFilters(roomType, 'roomType')}</dd>

						<dt className={styles.dt}>朝向</dt>
						<dd className={styles.dd}>{this.renderFilters(oriented, 'oriented')}</dd>

						<dt className={styles.dt}>楼层</dt>
						<dd className={styles.dd}>{this.renderFilters(floor, 'floor')}</dd>

						<dt className={styles.dt}>房屋亮点</dt>
						<dd className={styles.dd}>{this.renderFilters(characteristic, true)}</dd>
					</dl>
				</div>

				{/* 底部按钮 */}
				<FilterFooter
					className={styles.footer}
					clearFilter={() => {
						this.setState({ more: [] });
					}}
					confirmFilter={() => {
						confirmFilter(this.state.more);
					}}
				/>
			</div>
		);
	}
}
