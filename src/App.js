import Home from './pages/home';

import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
			</div>
			<Route
				path="/"
				exact
				render={() => {
					return <Redirect to="/home" />;
				}}
			/>
			<Route path="/home" component={Home} />
		</BrowserRouter>
	);
}

export default App;
