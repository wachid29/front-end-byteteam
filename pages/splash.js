import React from "react";
import Image from "next/image";
import imgSplash from "../public/images/splash.png";
import splashStyle from "../styles/pages/splash.module.css";

const splash = () => {
	return (
		<>
			<div className={splashStyle.main}>
				<div className="row justify-content-center">
					<div className={`col-md-4 ${splashStyle.splashWrapper}`}>
						<div className={`row justify-content-center ${splashStyle.splashImg}`}>
							<Image src={imgSplash} alt="logo" width="300px" height="300px" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default splash;
