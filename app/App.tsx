import React from "react";

import { Home, About, Contact } from "sections";
import { SectionProvider, Header } from "components";
import { AppContextProvider } from "./AppContext";
import { appData } from "./AppData";

const {
	home,
	about
} = appData;

export default () => (
	<AppContextProvider>
		<SectionProvider>
			<Header />
			<Home slides={home.slides}/>
			<About {...about}/>
			<Contact />
		</SectionProvider>
	</AppContextProvider>
);
