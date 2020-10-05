import React from "react";

import { Home, About, Contact, Features, Portfolio, Pricings, Testimonials } from "sections";
import { SectionProvider, Header } from "components";
import { AppContextProvider } from "./AppContext";
import { appData } from "./AppData";

const {
	home,
	about,
	contact
} = appData;

export default () => (
	<AppContextProvider>
		<SectionProvider>
			<Header />
			<Home slides={home.slides}/>
			<About {...about}/>
			<Contact {...contact}/>
			<Features />
			<Portfolio />
			<Pricings />
			<Testimonials />
		</SectionProvider>
	</AppContextProvider>
);
