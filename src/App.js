import Home from './pages/Home';

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
		</BrowserRouter>
	);
}

export default App;
