import { HomeProps, AboutProps, ContactProps } from "sections";

import Car1Image from "assets/car1.jpg";
import Car2Image from "assets/car2.jpg";
import Car3Image from "assets/car3.jpg";

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
				image: Car1Image,
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
				image: Car2Image,
				text: "Zie onze prijzen en bla bla bla",
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
				image: Car3Image,
				text: "Wil je rijden fakka?",
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
			}
		]
	},
	about: {
		title: {
			position: "left",
			title: "Why Choose Us",
			subTitle: "Who We Are"
		},
		text: "Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per idunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit.",
		bullets: [
			"Safety Driving",
			"Following Rules & Regulations",
			"Standard Vehicles",
			"Traffic Rules",
			"Special Classes",
			"Experience Instructors"
		],
		buttons: [
			{
				text: "Our Features",
				to: "features"
			},
			{
				text: "Contact",
				to: "contact"
			},
			{
				text: "Our Pricing",
				to: "pricing"
			},
			{
				text: "Testimonials",
				to: "testimonials"
			}
		],
		image: Car2Image,
	},
	contact: {
		image: Car3Image,
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
	home: HomeProps;
	about: AboutProps;
	contact: ContactProps;
}
