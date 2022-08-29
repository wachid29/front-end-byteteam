import moment from "moment";
import notificationStyle from "../../styles/notification.module.css";
import { ref, update } from "firebase/database";
import { database } from "../../firebase";
import { useState } from "react";

export default function NotificationBox(props) {
	const handleUpdate = (keys) => {
		if (keys) {
			const starCountRef = ref(database, `notif/${props?.user_id}/${keys}`);
			update(starCountRef, {
				status_notif: "read",
			});
		}
	};

	return (
		<div>
			{/* {console.log(props)} */}
			{props?.status_notif === "sended" ? (
				<div className={`${notificationStyle.card} card border-primary mb-3`} onClick={() => handleUpdate(props.keys)}>
					<div className="card-body ">
						<h5 className="card-title">{props?.title}</h5>
						<h6 className="card-text mb-4">{props?.notif}</h6>
						<p>{moment(props?.time).format("LLL")}</p>
					</div>
				</div>
			) : (
				<div className={`${notificationStyle.card} card border-dark mb-3`} style={{ backgroundColor: "#FFFFFF" }}>
					<div className="card-body border-dark">
						<h5 className="card-title text-dark">{props?.title}</h5>
						<h6 className="card-text mb-4">{props?.notif}</h6>
						<p>{moment(props?.time).format("LLL")}</p>
					</div>
				</div>
			)}
		</div>
	);
}
