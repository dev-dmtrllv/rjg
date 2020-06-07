import React from "react";

export const AppContext = React.createContext({ isMounted: false });

export const AppContextProvider: React.FC<Props> = ({ children, delay }) => 
{
	const [isMounted, setMounted] = React.useState(false);

	React.useEffect(() => 
	{
		setTimeout(() => 
		{
			setMounted(true);
		}, delay || 100);
	}, []);

	return (
		<AppContext.Provider value={{ isMounted }}>
			{children}
		</AppContext.Provider>
	);
}

export const useAppContext = () => React.useContext(AppContext);

type Props = {
	delay?: number;
}