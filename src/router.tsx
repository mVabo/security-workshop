import { createBrowserRouter } from 'react-router-dom';
import LoginScreen from './pages/auth/login';
import RegisterScreen from './pages/auth/register';
import ResetPasswordScreen from './pages/auth/reset-password';
import SpiesScreen from './pages/root/spies';
import AuthGuard from './components/auth-guard';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AuthGuard />,
		children: [
			{
				index: true,
				element: <SpiesScreen />,
			},
		],
	},
	{
		path: '/auth',
		children: [
			{
				path: 'login',
				element: <LoginScreen />,
			},
			{
				path: 'register',
				element: <RegisterScreen />,
			},
			{
				path: 'reset',
				element: <ResetPasswordScreen />,
			},
		],
	},
]);
