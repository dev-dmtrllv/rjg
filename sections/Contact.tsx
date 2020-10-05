import React from "react";
import { Section } from "components/Section";
import { SelectInput } from "components";

import "./styles/contact.scss";

export const Contact: React.FC<ContactProps> = ({ image }) => (
	<Section id="contact">
		{(active) =>
		{
			return (
				<div className="content">
					<div className="image">
						<div className="image-bg" style={{ backgroundImage: `url("${image}")` }} />
					</div>
					<div className="info">
						
					</div>
					<div className="contact-form">
						<form>
							<input type="text" />
							<input type="email" />
							<input type="phone" />
							<input type="date" />
							<SelectInput options={[]} placeholder="Choose your course type" />
						</form>
					</div>
				</div>
			);
		}}
	</Section>
);

export type ContactProps = {
	image: string;

};
