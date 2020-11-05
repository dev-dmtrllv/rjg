import React from "react";
import { ContactItems } from "./ContactItems";
import { Container } from "./Container";
import { Logo } from "./Logo";

import "./styles/footer.scss";

export const Footer = () =>
{
	return (
		<footer id="footer">
			<Container>
				<div className="left">
					<Logo />
					<br />
					<span>© 2020 All Rights Reserved.</span>
				</div>
				<ContactItems />
			</Container>
		</footer>
	);
}
