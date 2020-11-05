import React from "react";
import { Section, Carousel, CarouselItem, Container, SectionLink } from "components";

import "./styles/home.scss";

export const Home: React.FC<HomeProps> = ({ slides }) => 
{
	return (
		<Section id={"home"}>
			<Carousel timeout={50000}>
				{slides.map((slide, i) => (
					<CarouselItem key={i} background={slide.image}>
						<Container>
							<div className="panel">
								<div className="text">
									<div className="content">
										{slide.text}
									</div>
								</div>
								<div className="buttons">
									{slide.buttons.map(({ text, to, light = false }, i) => (
										<SectionLink className={`${light ? "light" : ""}`} key={i} to={to}>
											{text}
										</SectionLink>
									))}
								</div>
							</div>
						</Container>
					</CarouselItem>
				))}
			</Carousel>
		</Section>
	);
};

type ButtonInfo = {
	text: string;
	to: string;
	light?: boolean;
};

export type HomeSlideInfo = {
	image: string;
	text: string;
	buttons: ButtonInfo[];
}

export type HomeProps = {
	slides: HomeSlideInfo[];
}
