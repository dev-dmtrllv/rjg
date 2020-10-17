import React from "react";
import { getClassFromProps } from "utils/react";

import "./styles/section-title.scss";

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subTitle, position = "center" }) => 
{
	return (
		<div className={getClassFromProps("section-title", { [position]: true })}>
			<div className="wrapper">
				{subTitle && <h5 className="sub">{subTitle}</h5>}
				<h2 className="title">{title}</h2>
				<div className="underline" />
			</div>
		</div>
	);
};

export type SectionTitleProps = {
	position?: "left" | "center" | "right";
	title: string;
	subTitle: string;
};
