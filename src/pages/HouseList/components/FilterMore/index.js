import React, { Component } from 'react';
import FilterFooter from '../FilterFooter';
import styles from './index.module.css';

const selVal = {
	characteristicSel: '',
	floorSel: '',
	orientedSel: '',
	roomTypeSel: ''
};

export default class FilterMore extends Component {
	constructor(props) {
		super(props);
		this.state = { selVal };
	}

	// 渲染标签
	renderFilters(mydata, key) {
		let { selVal } = this.state;

		// 高亮类名： styles.tagActive  item.value是id
		return mydata.map((item) => {
			return (
				<span
					key={item.value}
					className={[ styles.tag, selVal[key] == item ? styles.tagActive : '' ].join(' ')}
					onClick={() => {
						let newSelVal = { ...selVal };
						newSelVal[key] = selVal[key] == item ? '' : item;
						this.setState({ selVal: newSelVal });
					}}
				>
					{item.label}
				</span>
			);
		});
	}

	componentDidMount() {
		this.props.defaultVal && this.setState({ selVal: this.props.defaultVal });
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
						<dd className={styles.dd}>{this.renderFilters(roomType, 'roomTypeSel')}</dd>

						<dt className={styles.dt}>朝向</dt>
						<dd className={styles.dd}>{this.renderFilters(oriented, 'orientedSel')}</dd>

						<dt className={styles.dt}>楼层</dt>
						<dd className={styles.dd}>{this.renderFilters(floor, 'floorSel')}</dd>

						<dt className={styles.dt}>房屋亮点</dt>
						<dd className={styles.dd}>{this.renderFilters(characteristic, 'characteristicSel')}</dd>
					</dl>
				</div>

				{/* 底部按钮 */}
				<FilterFooter
					className={styles.footer}
					clearFilter={() => {
						this.setState({ selVal: {} });
					}}
					confirmFilter={() => {
						confirmFilter(this.state.selVal);
					}}
				/>
			</div>
		);
	}
}
