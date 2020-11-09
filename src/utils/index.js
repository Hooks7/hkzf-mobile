import axios from 'axios';

export const location = () => {
	let city = JSON.parse(localStorage.getItem('city'));

	if (!city) {
		return new Promise((resolve) => {
			var myCity = new window.BMapGL.LocalCity();
			myCity.get(async (result) => {
				let res = await axios.get(`http://localhost:8080/area/info?name=${result.name}`);
				localStorage.setItem('city', JSON.stringify(res.data.body));

				resolve(res.data.body);
			});
		});
	}

	return Promise.resolve(city);
};
