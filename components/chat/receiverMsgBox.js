import moment from "moment";
import notificationStyle from "../../styles/notification.module.css";

import { useState } from "react";

export default function receiverMsgBox(props) {
	return (
		<>
			{/* receiver */}
			<div>
				<div
					style={{
						margin: "15px",
						display: "inline-block",
						background: "#000000",
						borderRadius: "15px",
						padding: "10px",
						color: "#FFFFFF",
						boxShadow: "0px 4px 4px rgba(0,0,0,0.1",
					}}>
					<div>
						<b>{props?.name}</b>
					</div>
					<div>
						<p>{props?.message}</p>
					</div>
					<div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
						<small style={{ fontSize: "10px" }}>{moment(props?.message_time).format("HH:mm")}</small>
						{props?.message_notif == "sended" ? (
							<small style={{ fontSize: "10px" }}>&#10003; </small>
						) : (
							<small style={{ fontSize: "10px" }}>X </small>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
