import React from "react";
import { scrollTo } from "utils/scroll";
import LogoImage from "assets/logo.png";

import "./styles/logo.scss";

export const Logo: React.FC<LogoProps> = ({ onClick, scrollToTop = true }) =>
{
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) =>
	{
		if (onClick && (onClick(e) === false))
			return;
		if (scrollToTop !== false)
			scrollTo(0);
	}
	return (
		<div className="logo" onClick={handleClick}>
			<img src={LogoImage} />
		</div>
	);
};

type LogoProps = {
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => boolean | void;
	scrollToTop?: boolean;
};