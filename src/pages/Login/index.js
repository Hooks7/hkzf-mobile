import React, { Component } from 'react';
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router-dom';
import NavHeader from '../../components/NavHeader';
import styles from './index.module.css';
import { withFormik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Toast } from 'antd-mobile';
import { request } from 'utils/request';

class Login extends Component {
	render() {
		return (
			<div className={styles.root}>
				{/* 顶部导航 */}
				<NavHeader className={styles.navHeader}>账号登录</NavHeader>
				<WhiteSpace size="xl" />

				{/* 登录表单 */}
				<WingBlank>
					<Form>
						<div className={styles.formItem}>
							<Field className={styles.input} name="username" placeholder="请输入账号" />
						</div>
						<ErrorMessage name="username" component="h5" className={styles.error} />

						<div className={styles.formItem}>
							<Field className={styles.input} name="password" placeholder="请输入密码" />
						</div>
						<ErrorMessage name="password" component="h5" className={styles.error} />

						{/* 长度为5到12位，只能出现数字、字母、下划线 */}
						{/* <div className={styles.error}>账号为必填项</div> */}
						<div className={styles.formSubmit}>
							<button className={styles.submit} type="submit">
								登 录
							</button>
						</div>
					</Form>
					<Flex className={styles.backHome}>
						<Flex.Item>
							<Link to="/registe">还没有账号，去注册~</Link>
						</Flex.Item>
					</Flex>
				</WingBlank>
			</div>
		);
	}
}

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/;
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/;

export default withFormik({
	validationSchema: Yup.object().shape({
		username: Yup.string().required('账号为必填项').matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
		password: Yup.string().required('密码为必填项').matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')
	}),

	mapPropsToValues: () => ({ username: 'test2', password: 'test2' }),
	handleSubmit: async (values, { props }) => {
		// 获取账号和密码
		const { username, password } = values;

		let res = await request.post('/user/login', {
			username,
			password
		});

		const { status, body, description } = res.data;

		if (status === 200) {
			localStorage.setItem('hkzf_token', body.token);

			if (props.location.state) {
				props.history.replace(props.location.state.from.pathname);
				return;
			}

			props.history.go(-1);

			return;
		}

		Toast.info(description, 2, null, false);
	}
})(Login);
