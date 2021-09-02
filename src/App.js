import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';

import AuthRoute from './utils/authRoute';

const CityList = lazy(() => import('./pages/CityList'));
const Login = lazy(() => import('./pages/Login'));
const MapIndex = lazy(() => import('./pages/Map'));
const Rent = lazy(() => import('./pages/rent'));
const Search = lazy(() => import('./pages/rent/Search'));
const RentAdd = lazy(() => import('./pages/rent/Add'));
const HouseDetail = lazy(() => import('./pages/HouseDetail'));

function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div className="route-loading">loading</div>}>
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
				<AuthRoute path="/map" Component={MapIndex} exact />
				<AuthRoute path="/rent" Component={Rent} exact />
				<AuthRoute path="/rent/add" Component={RentAdd} exact />
				<AuthRoute path="/rent/search" Component={Search} exact />
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
