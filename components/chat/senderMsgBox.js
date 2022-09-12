import moment from "moment";
import notificationStyle from "../../styles/notification.module.css";

import { useState } from "react";

export default function senderMsgBox(props) {
	return (
		<>
			{/* sender */}
			<div style={{ widht: "100%", display: "flex", justifyContent: "flex-end" }}>
				<div
					style={{
						margin: "15px",
						display: "inline-block",
						background: "#2395FF",
						borderRadius: "15px",
						padding: "10px",
						color: "#FFFFFF",
						boxShadow: "0px 4px 4px rgba(0,0,0,0.1",
					}}>
					<span>
						<b>{props?.name}</b>
					</span>
					<span>
						<p>{props?.message}</p>
					</span>
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
