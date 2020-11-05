import React from "react";
import { scrollTo } from "utils/scroll";
import { getHeaderOffset } from "./Header";
import { getClassFromProps } from "utils/react";

const SectionContext = React.createContext<SectionContextProps>({ activeId: "", elements: [], scrollTo: () => { } });

const elements: HTMLElement[] = [];

const scrollToSection = (id: string) =>
{
	const el = elements.find(el => el.id === id);
	if (el)
		scrollTo(el.offsetTop - getHeaderOffset());
}

export const SectionProvider: React.FC = ({ children }) =>
{
	const [activeId, setActiveId] = React.useState("");

	const onScroll = () =>
	{
		const st = document.scrollingElement!.scrollTop + (window.innerHeight / 2);
		for (let i = elements.length - 1; i > -1; i--)
		{
			const el = elements[i];
			if (el && (el.offsetTop < st))
			{
				if (activeId !== el.id)
					setActiveId(el.id);
				return;
			}
		}
	};

	React.useEffect(() => 
	{
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<SectionContext.Provider value={{ activeId, elements, scrollTo: scrollToSection }}>
			{children}
		</SectionContext.Provider>
	);
}

export const Section: React.FC<SectionProps> = ({ id, className, children }) =>
{
	const section = React.createRef<HTMLElement>();
	const { activeId, elements } = React.useContext(SectionContext);

	React.useEffect(() => 
	{
		const s = section.current;
		if (s && !elements.includes(s))
			elements.push(s);
		return () => 
		{
			if (s && elements.includes(s))
				elements.splice(elements.indexOf(s), 1);
		};
	}, []);

	const cn = getClassFromProps("section", {
		className,
		active: activeId === id
	});

	return (
		<section id={id} className={cn} ref={section}>
			{typeof children === "function" ? children(activeId === id) : children}
		</section>
	);
};

export const SectionLink: React.FC<SectionLinkProps> = ({ className, to, onClick, style, children }) =>
{
	const { activeId, scrollTo } = React.useContext(SectionContext);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) =>
	{
		e.preventDefault();

		if (onClick)
			return onClick(e);

		scrollTo(to);
	};

	const cn = getClassFromProps("link", {
		active: activeId === to,
		className
	});

	return (
		<a href={`#${to}`} className={cn} style={style} onClick={handleClick}>
			{children}
		</a>
	);
};

type SectionProps = {
	id: string;
	className?: string;
	title?: string | TitleOptions;
	children?: never[] | JSX.Element | ((isActive: boolean) => JSX.Element | string);
};

type TitleOptions = {
	title: string;
	position: "left" | "center" | "right";
	sub: string;
};

type SectionContextProps = {
	activeId: string;
	elements: HTMLElement[];
	scrollTo: (id: string) => void;
};

type SectionLinkProps = {
	className?: string;
	to: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => any;
	style?: React.CSSProperties;
};
