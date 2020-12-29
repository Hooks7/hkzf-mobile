import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './token';

export default function AuthRoute({ Component, ...reset }) {
	return (
		<Route
			{...reset}
			render={(props) => {
				if (!isAuth()) {
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}

				return <Component {...props} />;
			}}
		/>
	);
}
