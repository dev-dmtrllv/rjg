import React from "react";
import { Container, Section, SectionTitle, SectionTitleProps } from "components";

import "./styles/pricings.scss";

const transformPrice = (price: number): string =>
{
	const str = price.toString().split(".");
	if (str.length === 1)
		str.push("00");
	else if (str[1].length === 1)
		str[1] += "0";
	if (str[1] == "00")
		str[1] = "-";
	return str.join(",");
}

const isPricingsRef = (o: string | PricingsBlockRef): o is PricingsBlockRef => typeof o !== "string";

export const Pricings: React.FC<PricingsProps> = ({ title, pricingsBlocks, exclusivePricings }) => 
{
	const [refName, setRefName] = React.useState<string | null>(null);

	const getPrice = (name: string): string | null =>
	{
		const check = (b: (PricingsBlock | ExclusivePricings)[]) =>
		{
			const f = b.find(p => p.name === name);
			return f ? transformPrice(f.price) : null;
		}
		let f = check(pricingsBlocks);
		if (f)
			return f;
		f = check(exclusivePricings);
		return f;
	};

	const handleMouseEnter = (ref: string) => { setRefName(ref) };
	const handleMouseLeave = () => setRefName(null);

	return (
		<Section id="pricings">
			{() => 
			{
				return (
					<Container>
						<SectionTitle {...title} />
						<div className="pricings-blocks-wrapper">
							{pricingsBlocks.map(({ name, price, bullets, lessons, warn }, i) => (
								<div className={`pricings-block ${name === refName ? "ref" : ""}`} key={i}>
									<div className="block">
										<div className="name">{name}</div>
										{price && (<div className="price"><span className="eu">€</span>{transformPrice(price)}</div>)}
										<div className="lessons" style={lessons ? undefined : { color: "white", userSelect: "none" }}>{lessons || 0} praktijklessen</div>
										<div className="sep" />
										<div className="bullets">
											{bullets.map((b, i) =>
											{
												if (isPricingsRef(b))
													return (
														<div className="bullet" key={i} onMouseEnter={() => handleMouseEnter(b.ref)} onMouseLeave={handleMouseLeave}>
															<i className="fas fa-angle-right" /><div className="text">incl. {b.text} (t.w.v {getPrice(b.ref)})</div>
														</div>
													);
												return (
													<div className="bullet" key={i}>
														<i className="fas fa-angle-right" /><div className="text">{b}</div>
													</div>
												);
											}
											)}
										</div>
										<div className="sep" />
										<div className="btn-choose" tabIndex={0} onClick={() => console.log(name)}>
											Kies Pakket
										</div>
									</div>
								</div>
							))}
						</div>
					</Container>
				);
			}}
		</Section>
	);
};

type PricingsBlockRef = {
	text: string;
	ref: string;
};

type PricingsBlock = {
	name: string;
	price: number;
	lessons?: number;
	bullets: (string | PricingsBlockRef)[];
	warn?: string;
}

type ExclusivePricings = {
	name: string;
	price: number;
};

export type PricingsProps = {
	title: SectionTitleProps;
	pricingsBlocks: PricingsBlock[];
	exclusivePricings: ExclusivePricings[];
};
