import React from "react";
import Image from "next/image";
import imgWelcome from "../public/images/welcome.png";
import welcomeStyle from "../styles/pages/welcome.module.css";

const start = () => {
	return (
		<>
			<div className={welcomeStyle.main}>
				<div className="container">
					<div className="row justify-content-center">
						<div className={"col-md-4"}>
							<div className={"row justify-content-center mt-4"}>
								<Image src={imgWelcome} alt="logo" width="250px" height="250px" />
							</div>
							<div className={welcomeStyle.contentTitle}>
								<p>Get Started</p>
							</div>
							<div className={welcomeStyle.contentText}>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
							</div>
							<div className={`d-grid gap-2 mt-5 ${welcomeStyle.btn}`}>
								<button className="btn btn-lg" type="button">
									Create My Account
								</button>
								<button className="btn  btn-lg mt-3" type="button">
									Sign In
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default start;
