import Home from './pages/Home';
import MapIndex from './pages/Map';
import CityList from './pages/CityList';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<div className="App" />
			<Route
				path="/"
				exact
				render={() => {
					return <Redirect to="/home" />;
				}}
			/>
			<Route path="/home" component={Home} />
			<Route path="/map" component={MapIndex} />
			<Route path="/citylist" component={CityList} />
		</BrowserRouter>
	);
}

export default App;
