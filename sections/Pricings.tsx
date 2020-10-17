import React from "react";
import { Container, Section, SectionTitle, SectionTitleProps } from "components";

import "./styles/pricings.scss";

export const Pricings: React.FC<PricingsProps> = ({ title, }) => 
{
	return (
		<Section id="pricings">
			{() => 
			{
				return (
					<Container>
						<SectionTitle {...title} />
						
					</Container>
				);
			}}
		</Section>
	);
};

export type PricingsProps = {
	title: SectionTitleProps;

};
