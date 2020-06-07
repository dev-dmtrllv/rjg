import React from "react";

type Listener<K extends keyof WindowEventMap> = [K, (this: Window, ev: WindowEventMap[K]) => any, boolean | AddEventListenerOptions] | [K, (this: Window, ev: WindowEventMap[K]) => any];

export const useEvent = <K extends keyof WindowEventMap>(...listeners: Listener<K>[]) =>
{
	React.useEffect(() => 
	{
		listeners.forEach(l => window.addEventListener(l[0], l[1], l[2]));
		() => listeners.forEach(l => window.removeEventListener(l[0], l[1], l[2]));
	}, []);
};