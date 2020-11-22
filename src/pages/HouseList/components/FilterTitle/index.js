import { useState, useEffect } from 'react';
import { Flex } from 'antd-mobile';
import style from './index.module.css';

export default function FilterTitle({ titleStatus, onTitleClick }) {
	const title = [
		{ key: 'area', val: '区域' },
		{ key: 'mode', val: '方式' },
		{ key: 'price', val: '租金' },
		{ key: 'more', val: '筛选' }
	];

	return (
		<div className={style.title}>
			<Flex>
				{title.map((item) => {
					return (
						<Flex.Item
							className={[ style.item, titleStatus[item.key] ? style.sel : '' ].join(' ')}
							key={item.key}
							onClick={() => {


								// if (item.key === 'more') {return};

								onTitleClick(item.key);
							}}
						>
							{item.val} <i className="iconfont icon-arrow" />
						</Flex.Item>
					);
				})}
			</Flex>
		</div>
	);
}
