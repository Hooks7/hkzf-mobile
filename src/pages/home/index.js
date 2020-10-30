import React from 'react';
import { TabBar } from 'antd-mobile';
import { Route } from 'react-router-dom';
import './index.css';

import Index from '../Index';
import HouseList from '../HouseList';
import News from '../News';
import Profile from '../Profile';

const tabItems = [
	{
		title: '首页',
		icon: 'icon-ind',
		path: '/home'
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
			selectedTab: this.props.history.location.pathname
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
			<div>
				<div className="home">
					<Route path="/home" exact component={Index} />
					<Route path="/home/houselist" component={HouseList} />
					<Route path="/home/news" component={News} />
					<Route path="/home/profile" component={Profile} />
				</div>

				<TabBar unselectedTintColor="#949494" tintColor="#d7f4b5" barTintColor="white">
					{this.renderTab()}
				</TabBar>
			</div>
		);
	}
}
