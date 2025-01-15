import { useAuth } from '@/contexts/auth-context';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthGuard({ children }: PropsWithChildren) {
	const { token } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('/auth/login');
		}
	}, [token]);

	return children;
}
