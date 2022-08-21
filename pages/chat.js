import React from "react";
import chatStyle from "../styles/chat.module.css";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
function Chat() {
	return (
		<>
			<div className={chatStyle.main}>
				<div className="d-flex justify-content-between align-items-center mt-4 mb-4">
					<MdArrowBackIos className={chatStyle.backArrow} />
					<Link href="/editProfile" passHref>
						<a>Filter</a>
					</Link>
				</div>
				<h2 className="mb-3">Chat</h2>
				<div className="mb-4">
					<form className="input-group mb-3">
						<span className={`${chatStyle.icon} input-group-text bg-light`} id="basic-addon1">
							<FiSearch />
						</span>
						<input type="text" className={`${chatStyle.form} form-control bg-light`} placeholder="Type your message..." required />
					</form>
				</div>
				<div className="row mb-2">
					<div className="col-3">
						<div className="card mb-3" style={{ borderRadius: "15px" }}>
							<img
								src="/images/photo_profile.png"
								className="card-img-bottom"
								alt="photo profile"
								width="50px"
								height="70px"
								style={{ borderRadius: "15px" }}
							/>
						</div>
					</div>
					<div className="col-4 pt-1">
						<h5>Name</h5>
						<p>massage text</p>
					</div>
					<div className="col-4 d-flex justify-content-end">
						<h5>test</h5>
					</div>
				</div>
			</div>
		</>
	);
}

export default Chat;
