import React from 'react';
import SearchHeader from '../../components/SearchHeader';
import { location } from '../../utils';

export default class HouseList extends React.Component {
	state = {
		locationCity: ''
	};

	async componentDidMount() {
		let res = await location();
		this.setState({ locationCity: res.label });
	}

	render() {
		let { locationCity } = this.state;
		return (
			<div>
				<SearchHeader locationCity={locationCity} />
				HouseList
			</div>
		);
	}
}
