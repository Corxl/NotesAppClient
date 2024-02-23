import { createContext } from 'react';

export const ServerOnlineContext = createContext({
	isServerOnline: false,
    setIsServerOnline: (isServerOnline: boolean) => {},
});
