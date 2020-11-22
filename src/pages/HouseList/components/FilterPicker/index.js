// import { useState, useEffect } from 'react';
import React, { Component } from 'react';

import { PickerView } from 'antd-mobile';
import FilterFooter from '../FilterFooter';

export default class FilterPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selVal: this.props.defaultVal
		};
	}

	render() {
		let { data, closeFilter, confirmFilter, cols } = this.props;

		return (
			<div style={{ background: '#ffffff' }}>
				<PickerView
					data={data}
					cols={cols}
					value={this.state.selVal}
					onChange={(value) => {
						this.setState({
							selVal: value
						});
					}}
				/>

				{/* 底部按钮 */}
				<FilterFooter
					closeFilter={closeFilter}
					confirmFilter={() => {
						confirmFilter(this.state.selVal);
					}}
				/>
			</div>
		);
	}
}

// export default function FilterPicker({ data, titleType, defaultVal, closeFilter, confirmFilter }) {
// 	const [ cols, setCols ] = useState(3);
// 	const [ selVal, setSelVal ] = useState(defaultVal);
// 	const [ state, setstate ] = useState(null);

// 	useEffect(() => {
// 		if (titleType != 'area') {
// 			setCols(1);
// 		} else setCols(3);
// 	});

// 	const onChange = (val) => {
// 		setSelVal(val);
// 	};

// 	return (
// 		<div style={{ background: '#ffffff' }}>
// 			<PickerView data={data} cols={cols} val={selVal} onChange={onChange} />

// 			<FilterFooter
// 				closeFilter={closeFilter}
// 				confirmFilter={() => {
// 					confirmFilter(selVal);
// 				}}
// 			/>
// 		</div>
// 	);
// }
