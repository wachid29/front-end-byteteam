// import Lottie from "lottie-react";

// // Styles + Icons
// import underMaintenance from "@public/images/lottie/under-maintenance.json";

// // Components
// import LayoutBgWhite from "@components/layouts/LayoutBgWhite";

// export default function Chat() {
// 	return (
// 		<LayoutBgWhite title="Oops Website Under Maintenance - Booking Website" pageTitle="Chat">
// 			<div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 gap-2">
// 				<Lottie animationData={underMaintenance} loop={true} className="w-50" />
// 				<span className="fs-16 fw-semibold">Website Under Maintenance...</span>
// 				<span className="w-75 lato fs-12 text-center">
// 					Our website is currently undergoing scheduled maintenance. We should be back shortly. Thank you for your patience.
// 				</span>
// 			</div>
// 		</LayoutBgWhite>
// 	);
// }

import React from "react";
import chatStyle from "../styles/chat.module.css";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

function Chat() {
	return (
		<>
			<div className={chatStyle.main}>
				<div className="d-flex justify-content-between align-items-center mt-4 mb-2">
					<Link href="/" passHref>
						<MdArrowBackIos className={chatStyle.backArrow} />
					</Link>
				</div>
				<h2 className="mb-2">Chat</h2>
				<div className="mb-4">
					<form className="input-group mb-3">
						<span className={`${chatStyle.icon} input-group-text bg-light`} id="basic-addon1">
							<FiSearch />
						</span>
						<input type="text" className={`${chatStyle.form} form-control bg-light`} placeholder="Type your message..." required />
					</form>
				</div>
				<div className="container-fluid pt-3" style={{ borderTop: "0.5px solid black", borderBottom: "0.5px solid black" }}>
					<Link href={`/roomChat/${encodeURIComponent(1)}`} passHref>
						<div className="row mb-2">
							<div className="col-3">
								<div className="card mb-3 d-flex align-items-center" style={{ borderRadius: "10px", border: "2px solid black" }}>
									<img
										src="/images/grup_chat.png"
										className="card-img-bottom"
										alt="photo profile"
										width="50px"
										height="70px"
										style={{ borderRadius: "15px" }}
									/>
								</div>
							</div>
							<div className="col-9 ">
								<h4>Group Chat 1</h4>
								<small>Group Diskusi Development Aplikasi Ticketing</small>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}

export default Chat;
