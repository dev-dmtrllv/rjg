import React from "react";
import { Section } from "components/Section";

export const Contact = () => (
	<Section id="contact">
		{(active) => active ? "active" : "non active"}
	</Section>
);