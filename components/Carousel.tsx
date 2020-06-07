import React, { Children, useEffect } from "react";

import "./styles/carousel.scss";
import { useAppContext } from "app/AppContext";

export const Carousel: React.FC<CarouselProps> = ({ timeout = 3500, children }) =>
{
	const [index, setIndex] = React.useState<number>(0);

	const { isMounted } = useAppContext();

	const count = Children.count(children) - 1;

	let interval: null | NodeJS.Timeout = null;

	const next = () =>
	{
		let newIndex = index + 1;
		if (newIndex > count)
			newIndex = 0;
		setIndex(newIndex);
	}

	const prev = () =>
	{
		let newIndex = index - 1;
		if (newIndex < 0)
			newIndex = count;
		setIndex(newIndex);
	}

	const slideTo = (newIndex: number) => 
	{
		if (newIndex <= count && newIndex >= 0)
			setIndex(newIndex);
	};

	const resetTimeout = () =>
	{
		if (interval)
			clearTimeout(interval);
		interval = setTimeout(() => 
		{
			let newIndex = index + 1;
			if (newIndex > count)
				newIndex = 0;
			setIndex(newIndex);
			resetTimeout();
		}, timeout);
	}

	useEffect(() => 
	{
		resetTimeout();
		return () =>
		{
			if (interval)
				clearTimeout(interval);
		};
	}, [index]);

	const getBulletClass = (i: number) => `bullet ${i === index ? "active" : ""}`;

	return (
		<div className="carousel">
			<div className="slider" style={{ left: `-${index * 100}%` }}>
				{Children.map(children as any, (item: React.ReactElement, i) =>
				{
					return React.cloneElement(item, {
						key: i,
						className: (isMounted && i === index) ? "active" : "",
					});
				})}
			</div>
			<div className="btn-prev" onClick={prev}>
				<i className="fas fa-chevron-left" />
			</div>
			<div className="btn-next" onClick={next}>
				<i className="fas fa-chevron-right" />
			</div>
			<div className="bullet-group">
				{Children.map(children, (_, i) => <div key={i} className={getBulletClass(i)} onClick={() => slideTo(i)} />)}
			</div>
		</div>
	);
};

export const CarouselItem: React.FC<CarouselItemProps> = ({ children, background, className = "" }) => (
	<div className={`item ${className}`} style={{ backgroundImage: `url(${background})` }}>
		{children}
	</div>
);

type CarouselProps = {
	timeout?: number;
};

type CarouselItemProps = {
	background: string;
	className?: string;
};