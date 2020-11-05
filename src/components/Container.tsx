import React from "react";

import "./styles/container.scss";

export const Container: React.FC = ({ children }) => (
	<div className="container">
		{children}
	</div>
);