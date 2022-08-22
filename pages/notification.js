import Lottie from "lottie-react";

// Styles + Icons
import underMaintenance from "@public/images/lottie/under-maintenance.json";

// Components
import LayoutBgWhite from "@components/layouts/LayoutBgWhite";

export default function Notification() {
	return (
		<LayoutBgWhite title="Oops Website Under Maintenance - Booking Website" pageTitle="Notifications">
			<div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 gap-2">
				<Lottie animationData={underMaintenance} loop={true} className="w-50" />
				<span className="fs-16 fw-semibold">Website Under Maintenance...</span>
				<span className="w-75 lato fs-12 text-center">
					Our website is currently undergoing scheduled maintenance. We should be back shortly. Thank you for your patience.
				</span>
			</div>
		</LayoutBgWhite>
	);
}

// import React, { useState } from "react";
// import notificationStyle from "../styles/notification.module.css";
// import Link from "next/link";
// import { MdArrowBackIos } from "react-icons/md";
// import { database } from "../firebase";
// import { ref, onValue } from "firebase/database";

// function Notification(props) {
// 	const [notification, setNotification] = useState([]);
// 	const [keys, setkeys] = useState([]);

// 	React.useEffect(() => {
// 		const id_user = 2;

// 		const starCountRef = ref(database, `notification/${id_user}`);
// 		onValue(starCountRef, (snapshot) => {
// 			const data = snapshot.val();
// 			if (data && typeof data == "object") {
// 				console.log(data);
// 			}
// 		});
// 	}, []);

// 	console.log(
// 		"notif",
// 		notification?.map((item) => {
// 			return item;
// 		})
// 	);

// 	return (
// 		<>
// 			<div className={notificationStyle.main}>
// 				<div className="d-flex justify-content-between align-items-center mt-4 mb-4">
// 					<MdArrowBackIos className={notificationStyle.backArrow} />
// 					<Link href="/editProfile" passHref>
// 						<a>Clear</a>
// 					</Link>
// 				</div>
// 				<h2 className="mb-3">Notifications</h2>
// 				<NotificationBox />

// 				{/* <div className="card border-primary mb-3" key={keys}>
// 					<div className="card-body text-primary">
// 						<h5 className="card-title">tes</h5>
// 						<p className="card-text">test</p>
// 						<p>test</p>
// 					</div>
// 				</div> */}
// 			</div>
// 		</>
// 	);
// }

// const NotificationBox = (props) => {
// 	return (
// 		<div className="card border-primary mb-3">
// 			<div className="card-body text-primary">
// 				<h5 className="card-title">tes</h5>
// 				<p className="card-text">test</p>
// 				<p>test</p>
// 			</div>
// 		</div>
// 	);
// };

// export default Notification;
