import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
// 只有路由 Route 直接渲染的组件才能够获取到路由信息，如果需要在其他组件中获取到路由信息可以通过 withRouter 高阶组件来获取

class NavHeader extends React.Component {
	render() {
		return (
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.go(-1)}>
				{this.props.children}
			</NavBar>
		);
	}
}

export default withRouter(NavHeader);
