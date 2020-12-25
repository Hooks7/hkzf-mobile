import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './token';

export default function AuthRoute({ children, ...reset }) {
	return (
		<Route
			{...reset}
			render={({ location }) => {
				if (!isAuth()) {
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: location }
							}}
						/>
					);
				}

				return children;
			}}
		/>
	);
}
