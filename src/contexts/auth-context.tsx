import { createContext, ReactNode, useContext, useState } from 'react';

interface StateProps {
	token: string | undefined;
	setToken: (token: string | undefined) => void;
}

const AuthContext = createContext<StateProps>({
	token: undefined,
	setToken: () => {},
});

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider');
	}

	return context;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | undefined>(undefined);

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
}
