import React from 'react';
import { TabBar } from 'antd-mobile';

const tabItems = [
	{
		title: '首页',
		icon: 'icon-ind',
		path: '/home/index'
	},
	{
		title: '找房',
		icon: 'icon-findHouse',
		path: '/home/houselist'
	},
	{
		title: '资讯',
		icon: 'icon-infom',
		path: '/home/news'
	},
	{
		title: '我的',
		icon: 'icon-my',
		path: '/home/profile'
	}
];

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: '/home/index'
		};
	}

	renderTab() {
		return tabItems.map((item) => (
			<TabBar.Item
				title={item.title}
				key={item.path}
				icon={<i className={`iconfont ${item.icon}`} />}
				selectedIcon={<i className={`iconfont ${item.icon}`} />}
				selected={this.state.selectedTab === item.path}
				onPress={() => {
					this.props.history.push(item.path);
					this.setState({ selectedTab: item.path });
				}}
			/>
		));
	}

	render() {
		return (
			<div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
				<TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white">
					{this.renderTab()}
				</TabBar>
			</div>
		);
	}
}
