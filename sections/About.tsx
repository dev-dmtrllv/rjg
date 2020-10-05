import React from "react";
import { Section, SectionLink } from "components/Section";
import { Container, SectionTitle, SectionTitleProps } from "components";

import "./styles/about.scss";

const colors = [
	"rgb(140, 197, 64)",
	"rgb(187, 215, 34)",
	"rgb(68, 184, 181)",
	"rgb(64, 153, 149)",
];

export const About: React.FC<AboutInfo> = ({ title, bullets, buttons, image, text }) =>
{
	return (
		<Section id="about">
			{(active) => (
				<>
					<Container>
						<div className="top">
							<div className="content">
								<SectionTitle {...title} />
								<p>{text}</p>
								<div className="bullets">
									{bullets.map((txt, i) => 
									{
										return (
											<div key={i} className="bullet">
												<i className="far fa-check-circle" />
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
						</div>
					</Container>
					<div className="button-group">
						{buttons.map(({ text, to }, i) => 
						{
							return (
								<SectionLink key={i} className="btn" to={to} style={{ backgroundColor: colors[i % 4] }}>
									{text.substr(0, 4)}
								</SectionLink>
							);
						})}
					</div>
				</>
			)}
		</Section>
	);
};


type AboutButton = {
	text: string;
	to: string;
};

export type AboutInfo = {
	title: SectionTitleProps;
	text: string;
	bullets: string[];
	buttons: AboutButton[];
	image: string;
};
