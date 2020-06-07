import { HomeSlideInfo } from "sections"

import Car1 from "assets/car1.jpg";
import Car2 from "assets/car2.jpg";
import Car3 from "assets/car3.jpg";

export const appData: AppData = {
	contactInfo: {
		adress: "Lorem Ipsum 152",
		city: "Emmen",
		email: "123@rijschool-groen.com",
		post: "1234 AB",
		phone: "0123-456789"
	},
	home: {
		slides: [
			{
				image: Car1,
				text: "Wil je met de auto veilig, zelfverzekerd en goed voorbereid de weg op?",
				buttons: [
					{
						text: "Lees Meer",
						to: "about"
					},
					{
						text: "Contact",
						to: "contact",
						light: true
					}
				]
			},
			{
				image: Car2,
				text: "Zie onze prijzen en bla bla bla",
				buttons: [
					{
						text: "Lees Meer",
						to: "about"
					},
					{
						text: "Contact",
						to: "contact"
					}
				]
			},
			{
				image: Car3,
				text: "Wil je rijden fakka?",
				buttons: [
					{
						text: "Lees Meer",
						to: "about"
					},
					{
						text: "Contact",
						to: "contact"
					}
				]
			}
		]
	}
}

type AppData = {
	contactInfo: {
		city: string;
		adress: string;
		post: string;
		phone: string;
		email: string;
	}
	home: { slides: HomeSlideInfo[] };
}