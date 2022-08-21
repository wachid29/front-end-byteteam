import React, { useState } from "react";
import notificationStyle from "../styles/notification.module.css";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

function Notification(props) {
	const [notification, setNotification] = useState([]);
	const [keys, setkeys] = useState([]);

	React.useEffect(() => {
		const id_user = 2;

		const starCountRef = ref(database, `notification/${id_user}`);
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			if (data && typeof data == "object") {
				console.log(data);
			}
		});
	}, []);

	console.log(
		"notif",
		notification?.map((item) => {
			return item;
		})
	);

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
				<NotificationBox />

				{/* <div className="card border-primary mb-3" key={keys}>
					<div className="card-body text-primary">
						<h5 className="card-title">tes</h5>
						<p className="card-text">test</p>
						<p>test</p>
					</div>
				</div> */}
			</div>
		</>
	);
}

const NotificationBox = (props) => {
	return (
		<div className="card border-primary mb-3">
			<div className="card-body text-primary">
				<h5 className="card-title">tes</h5>
				<p className="card-text">test</p>
				<p>test</p>
			</div>
		</div>
	);
};

export default Notification;
