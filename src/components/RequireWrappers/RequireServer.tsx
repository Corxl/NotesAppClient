import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServerOnlineContext } from '../../context/ServerContext.tsx';
import { useLogin } from '../../hooks/useLogin.tsx';

type Props = {
	element: React.ReactNode;
}; 


export default function RequireServer({ element }: Props) {
	const navigator = useNavigate();
	const { pingServer } = useLogin(); 
    const {isServerOnline, setIsServerOnline} = useContext(ServerOnlineContext);

	useEffect(() => {
		(async () => {
			try {
				await pingServer(); 
                console.log('Server is online');
                setIsServerOnline(true);
			} catch (err) {
				// show server offline error to user thought navigator function call.
				navigator('/server-offline'); 
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ServerOnlineContext.Provider value={{ isServerOnline, setIsServerOnline }}>
			{element}
		</ServerOnlineContext.Provider>
	);
}
