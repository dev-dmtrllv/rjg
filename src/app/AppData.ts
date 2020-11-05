import { HomeProps, AboutProps, ContactProps, PricingsProps } from "sections";

import Car1Image from "assets/car1.jpg";
import Car2Image from "assets/car2.jpg";
import Car3Image from "assets/car3.jpg";
import { HeaderProps } from "components";

export const appData: AppData = {
	contactInfo: {
		adress: "Lorem Ipsum 152",
		city: "Emmen",
		email: "123@rijschool-groen.com",
		post: "1234 AB",
		phone: "0123-456789"
	},
	header: {
		links: [
			{
				text: "Home",
				to: "home"
			},
			{
				text: "About",
				to: "about"
			},
			{
				text: "Pricings",
				to: "pricings"
			},
			{
				text: "Contact",
				to: "contact"
			},
		]
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
				text: "Kies het voor jou geschikte pakket! Er is keuze uit verschillende mogelijkheden.",
				buttons: [
					{
						text: "Lees Meer",
						to: "pricings"
					},
				]
			},
			{
				image: Car3Image,
				text: "Nog meer tekst Lorem Ipsum etc...",
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
		text: "Dan is het nu de tijd om bij mij je rijbewijs te halen. Het rijbewijs draagt tenslotte aan bij het zeer prettige gevoel van vrijheid! Je krijgt les van een vaste, door Innovam gecertificeerde vrouwelijke rij-instructeur, namelijk Judith Groen. Iedere les ga je in dezelfde auto rijden, en in deze auto ga je ook afrijden. Autorijschool J. Groen is een frisse onderneming die van toekomstige bestuurders veelzijdige, zelfverzekerde en vooral veilige weggebruikers maakt.",
		bullets: [
			"Veiligheid",
			"Kwaliteit",
			"Betrokkenheid",
			"Ervaring",
		],
		image: Car2Image,
	},
	pricings: {
		title: {
			position: "center",
			subTitle: "Get Special Offer",
			title: "Our Pricings"
		},
		pricingsBlocks: [
			{
				name: "Spoed Cursus",
				lessons: 25,
				price: 1195,
				bullets: [
					"Praktijkexamen CBR",
					"Meerdere lessen per week"
				],
				warn: "Voor deze cursus moet je je theorie al hebben gehaald!"
			},
			{
				name: "Start & Go 25",
				lessons: 25,
				price: 1295,
				bullets: [
					{ text: "Theorie Pakket", ref: "Theorie" },
					{ text: "Tussentijdse toets CBR", ref: "Tussentijdse toets CBR" },
					{ text: "Praktijkexamen CBR", ref: "Praktijkexamen CBR" },
				],
			},
			{
				name: "Start & Go 30",
				lessons: 30,
				price: 1445,
				bullets: [
					{ text: "Theorie Pakket", ref: "Theorie" },
					{ text: "Tussentijdse toets CBR", ref: "Tussentijdse toets CBR" },
					{ text: "Praktijkexamen CBR", ref: "Praktijkexamen CBR" },
				],
			},
			{
				name: "Start & Go 40",
				lessons: 40,
				price: 1785,
				bullets: [
					
					{ text: "Theorie Pakket", ref: "Theorie" },
					{ text: "Tussentijdse toets CBR", ref: "Tussentijdse toets CBR" },
					{ text: "Praktijkexamen CBR", ref: "Praktijkexamen CBR" },
				],
			},
			{
				name: "Theorie",
				price: 39.50,
				bullets: [
					"Boek + 10 uur online examen training",
					"Meerdere lessen per week"
				],
			},
			{
				name: "Cheap 10",
				lessons: 10,
				price: 385,
				bullets: [
					"Pakket met 10 losse lessen"
				],
			},
		],
		exclusivePricings: [
			{
				name: "Losse les van 60 minuten",
				price: 39.50,
			},
			{
				name: "Tussentijdse toets CBR",
				price: 160,
			},
			{
				name: "Praktijkexamen CBR",
				price: 195,
			},
			{
				name: "Faalangstexamen",
				price: 235,
			}
		]
	},
	contact: {
		title: "Contact",
		contactInfo: [
			{
				icon: "road",
				title: "Veiligheid",
				text: "Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio morbi cumsan ipsum velit. Nam nec tellus a odio ti."
			},
			{
				icon: "user-graduate",
				title: "Afrijden",
				text: "Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio morbi cumsan ipsum velit. Nam nec tellus a odio ti."
			},
			{
				icon: "exchange-alt",
				title: "Communicatie",
				text: "Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio morbi cumsan ipsum velit. Nam nec tellus a odio ti."
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
	header: HeaderProps;
	home: HomeProps;
	about: AboutProps;
	pricings: PricingsProps;
	contact: ContactProps;
};
