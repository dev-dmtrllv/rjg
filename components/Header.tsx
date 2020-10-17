import React from "react";
import { getClassFromProps } from "utils/react";
import { scrollToTop, scrollTo } from "utils/scroll";
import { useEvent } from "hooks/useEvent";

import { SectionLink } from "./Section";
import { Container } from "./Container";
import { Logo } from "./Logo";

import { appData } from "app/AppData";

import "./styles/header.scss";

const MAX_HEADER_WIDTH = 870;
const HEADER_HEIGHT = 120;
const SLIDER_TIMEOUT = 650;

const isHidden = () => window.innerWidth < MAX_HEADER_WIDTH;

const isFixed = () =>
{
	const off = document.scrollingElement!.scrollTop;
	const h = isHidden();
	if (h || (!h && (off >= HEADER_HEIGHT)))
		return true;
	return false;
}

export const getHeaderOffset = () => isHidden() ? 64 : 0;

export const Header: React.FC<HeaderProps> = ({ links }) =>
{
	const [{ hidden, fixed }, setState] = React.useState({
		hidden: isHidden(),
		fixed: isFixed(),
	});

	const [isSidebarOpen, setSidebarState] = React.useState(false);
	const [isSidebarSliding, setIsSidebarSliding] = React.useState(false);

	const update = () => 
	{
		const h = isHidden();
		if (!h && isSidebarOpen)
			setSidebarState(false);
		setState({
			hidden: h,
			fixed: isFixed()
		});
	};

	const toggleSidebar = () => 
	{
		setSidebarState(!isSidebarOpen);
		setIsSidebarSliding(true);
		setTimeout(() => { setIsSidebarSliding(false); }, SLIDER_TIMEOUT);
	};

	useEvent(["resize", update], ["scroll", update]);

	const headerClass = getClassFromProps("header", { hidden });
	const navClass = getClassFromProps("nav", { hidden, fixed });

	const { adress, city, email, phone, post } = appData.contactInfo;

	return (
		<>
			<div id="header" className={headerClass} style={{ height: `${HEADER_HEIGHT}px` }}>
				<Container>
					<Logo />
					<div className="items">
						<HeaderItem icon="fas fa-map-marker-alt">
							{[adress, `${city}, ${post}`]}
						</HeaderItem>
						<HeaderItem icon="fas fa-phone-alt">
							{phone}
						</HeaderItem>
						<HeaderItem icon="far fa-envelope">
							{email}
						</HeaderItem>
					</div>
				</Container>
			</div>
			<nav className={navClass}>
				<div tabIndex={0} className={`sidebar-btn ${isSidebarOpen ? "open" : ""}`} onClick={toggleSidebar}>
					<div className="inner-btn" />
				</div>
				<Container>
					<Logo />
					<div className="link-group">
						{links.map((link, i) => <SectionLink key={i} to={link.to} onClick={i === 0 ? () => hidden ? scrollToTop() : scrollTo(HEADER_HEIGHT) : undefined}>{link.text}</SectionLink>)}
					</div>
				</Container>
			</nav>
			<div className={`sidebar ${isSidebarOpen ? "open" : ""} ${isSidebarSliding ? "sliding" : ""}`}>
				{links.map((link, i) => <SectionLink key={i} to={link.to} onClick={i === 0 ? () => hidden ? scrollToTop() : scrollTo(HEADER_HEIGHT) : undefined}>{link.text}</SectionLink>)}
			</div>
			<div className="nav-spacer" style={{ height: `${hidden ? 64 : 0}px` }} />
		</>
	);
};

const HeaderItem: React.FC<HeaderItemProps> = ({ icon, children }: HeaderItemProps) =>
{
	const text: string[] = Array.isArray(children) ? children : [children];
	return (
		<div className="item">
			<div className="icon">
				<i className={icon} />
			</div>
			<div className="content">
				{text.map((t, i) => <div key={i} className="text">{t}</div>)}
			</div>
		</div>
	);
};

type HeaderItemProps = {
	icon: string;
	children: string | string[];
};

export type HeaderProps = {
	links: {
		text: string;
		to: string;
	}[];
};
