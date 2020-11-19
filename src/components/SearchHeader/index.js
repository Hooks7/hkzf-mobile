import React from 'react';
import { Flex } from 'antd-mobile';
import style from './index.module.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function SearchHeader({ history, locationCity }) {
	return (
		// <Flex className={style.searchBox}>
		// 	<i className="iconfont icon-back" />
		// 	<Flex className="searchLeft">
		// 		<div className="location" onClick={() => history.push('/citylist')}>
		// 			<span>{locationCity}</span>
		// 			<i className="iconfont icon-arrow" />
		// 		</div>
		// 		<div className="searchForm">
		// 			<i className="iconfont icon-seach" />
		// 			<span>请输入小区或地址</span>
		// 		</div>
		// 	</Flex>
		// 	<i
		// 		className={`iconfont icon-map ${style.iconMap}`}
		// 		onClick={() => {
		// 			history.push('/map');
		// 		}}
		// 	/>
		// </Flex>
	);
}

SearchHeader.propTypes = {
	locationCity: PropTypes.string.isRequired,
};

export default withRouter(SearchHeader);
