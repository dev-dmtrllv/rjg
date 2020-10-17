import { appData } from "app/AppData";
import React from "react";

import "./styles/contact-items.scss";

const HeaderItem: React.FC<HeaderItemProps> = ({ icon, children }: HeaderItemProps) =>
{
	const text: string[] = Array.isArray(children) ? children : [children];
	return (
		<div className="item">
			<div className="icon">
				<i className={icon} />
			</div>
			<div className="content">
				{text.map((t, i) => <div key={i} className="text">{t}</div>)}
			</div>
		</div>
	);
};

const { adress, city, email, phone, post } = appData.contactInfo;

export const ContactItems = () =>
{
	return (
		<div className="contact-items">
			<HeaderItem icon="fas fa-map-marker-alt">
				{[adress, `${city}, ${post}`]}
			</HeaderItem>
			<HeaderItem icon="fas fa-phone-alt">
				{phone}
			</HeaderItem>
			<HeaderItem icon="far fa-envelope">
				{email}
			</HeaderItem>
		</div>
	);
};

type HeaderItemProps = {
	icon: string;
	children: string | string[];
};
