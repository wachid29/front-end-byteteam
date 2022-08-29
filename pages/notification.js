// import Lottie from "lottie-react";

// // Styles + Icons
// import underMaintenance from "@public/images/lottie/under-maintenance.json";

// // Components
// import LayoutBgWhite from "@components/layouts/LayoutBgWhite";

// export default function Notification() {
// 	return (
// 		<LayoutBgWhite title="Oops Website Under Maintenance - Booking Website" pageTitle="Notifications">
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

import React, { useState } from "react";
import notificationStyle from "../styles/notification.module.css";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { object } from "yup";
import NotificationBox from "@components/notification/NotificationBox";
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";
import fetcher from "@utils/axios/fetcher";

function Notification(props) {
	const { user } = props;

	const [notification, setNotification] = useState([]);
	const [keys, setkeys] = useState([]);

	React.useEffect(() => {
		const starCountRef = ref(database, `notif/${user.id}`);
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			if (data && typeof data == "object") {
				setNotification(data);
				setkeys(Object.keys(data));
			}
		});
	}, []);

	return (
		<>
			<div className={notificationStyle.main}>
				<div className="d-flex justify-content-between align-items-center mt-4 mb-4">
					<Link href="/" passHref>
						<a style={{ color: "#000000" }}>
							<MdArrowBackIos className={notificationStyle.backArrow} />
						</a>
					</Link>
					<Link href="/" passHref>
						<a>Clear</a>
					</Link>
				</div>
				<h2 className="mb-4">Notifications</h2>
				{keys?.reverse().map((item) => {
					let current = notification[item];

					if (current) return <NotificationBox {...current} keys={item} />;
				})}
			</div>
		</>
	);
}

export const getServerSideProps = async ({ req }) => {
	if (hasCookie("token", { req }) && hasCookie("datas", { req })) {
		const user = decryptData(getCookie("datas", { req }));
		const userProfile = await fetcher.getProfile(user?.id);

		return {
			props: {
				user: userProfile,
			},
		};
	}
};

export default Notification;
