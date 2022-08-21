import React from "react";
import ticketingStyle from "../../styles/ticketing.module.css";

function Ticketing() {
	return (
		<>
			<div className="container text-center">
				<div className="row">
					<div className="col-4 align-self-start">One of three columns</div>
					<div className="col-4 align-self-center">One of three columns</div>
					<div className="col-4 align-self-end">One of three columns</div>
				</div>
			</div>
		</>
	);
}

export default Ticketing;
