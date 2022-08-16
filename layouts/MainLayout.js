import React from "react";
// components
import NavBottom from "components/navbar/NavBottom";
import NavTop from "components/navbar/NavTop";

function MainLayout(props) {
	return (
		<div>
			<div>{props.children}</div>
			<NavTop />
			<NavBottom />
		</div>
	);
}

export default MainLayout;
