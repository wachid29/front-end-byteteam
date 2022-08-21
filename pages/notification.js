import React from "react";
import notificationStyle from "../styles/notification.module.css";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
function Notification() {
	return (
		<>
			<div className={notificationStyle.main}>
				<div className="d-flex justify-content-between align-items-center mt-4 mb-4">
					<MdArrowBackIos className={notificationStyle.backArrow} />
					<Link href="/editProfile" passHref>
						<a>Clear</a>
					</Link>
				</div>
				<h2 className="mb-3">Notifications</h2>
				{[...new Array(4)].map((item, index) => (
					<div className="card border-primary mb-3" key={index}>
						<div className="card-body text-primary">
							<h5 className="card-title">Congratulations</h5>
							<p className="card-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore....
							</p>
							<p>1 June 2020, 12:33 AM</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default Notification;
