import React from "react";

import { Home, About, Contact, Features, Portfolio, Pricings, Testimonials } from "sections";
import { SectionProvider, Header } from "components";
import { AppContextProvider } from "./AppContext";
import { appData } from "./AppData";

const {
	header,
	home,
	about,
	contact
} = appData;

export default () => (
	<AppContextProvider>
		<SectionProvider>
			<Header {...header}/>
			<Home slides={home.slides}/>
			<About {...about}/>
			<Features />
			<Portfolio />
			<Pricings />
			<Testimonials />
			<Contact {...contact}/>
		</SectionProvider>
	</AppContextProvider>
);
