import React from "react";
import { Section } from "components/Section";
import { Container, SectionTitle, SectionTitleProps } from "components";

import "./styles/about.scss";

export const About: React.FC<AboutProps> = ({ title, bullets, image, text }) =>
{
	return (
		<Section id="about">
			{(active) => (
				<>
					<Container>
						<div className="content">
							<SectionTitle {...title} />
							<p>{text}</p>
							<div className="bullets">
								{bullets.map((txt, i) => 
								{
									return (
										<div key={i} className="bullet">
											<i className="fas fa-check-circle" />
											<div className="txt">
												{txt}
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<div className="img">
							<img src={image} />
						</div>
					</Container>
				</>
			)}
		</Section>
	);
};

export type AboutProps = {
	title: SectionTitleProps;
	text: string;
	bullets: string[];
	image: string;
};
