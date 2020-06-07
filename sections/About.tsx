import React from "react";
import { Section } from "components/Section";

export const About = () => (
	<Section id="about">
		{(active) => active ? "active" : "non active"}
	</Section>
);