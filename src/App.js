import Home from './pages/Home';
import MapIndex from './pages/Map';
import CityList from './pages/CityList';
import HouseDetail from './pages/HouseDetail';
import Login from './pages/Login';
import AuthRoute from './utils/authRoute';
import Rent from './pages/rent'
import RentAdd from './pages/rent/Add'
import Search from './pages/rent/Search'
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

			<Route path="/citylist" component={CityList} />
			<Route path="/detail/:id" component={HouseDetail} />
			<Route path="/login" component={Login} />
			<AuthRoute path="/map" Component={MapIndex} exact/>
			<AuthRoute path="/rent" Component={Rent} exact/>
			<AuthRoute path="/rent/add" Component={RentAdd} exact/>
			<AuthRoute path="/rent/search" Component={Search} exact/>
		</BrowserRouter>
	);
}

export default App;
