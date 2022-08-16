// Styles + Icons
import styles from "@styles/components/cards/MyBookingCard.module.css";
import { FaPlaneDeparture } from "react-icons/fa";

export default function MyBookingCard({ status }) {
	return (
		<div className={styles["container"]}>
			<div className={"d-flex flex-column bg-white " + styles["zigzag"]}>
				<div className="d-flex flex-column p-4 gap-2">
					<span className="fs-14 fw-normal">Monday, 20 July &apos;20 - 12:33</span>
					<div className="d-flex align-items-center gap-4">
						<span className="fs-20 fw-semibold">IDN</span>
						<FaPlaneDeparture size={18} className="text-gray" />
						<span className="fs-20 fw-semibold">JPN</span>
					</div>
					<span className="fs-14 fw-normal text-gray">Garuda Indonesia, AB-221</span>
				</div>
				<div className={"d-flex align-items-center justify-content-between p-4 pb-5 " + styles["border-spacer"]}>
					<span className="fs-14 fw-semibold text-darkgray">Status</span>
					{status === "waiting" && (
						<div className="bg-lightorange fs-14 fw-semibold text-white py-2 px-3 rounded-3">Waiting for payment</div>
					)}
					{status === "cancel" && <div className="bg-red fs-14 fw-semibold text-white py-2 px-3 rounded-3">Canceled</div>}
					{status === "success" && <div className="bg-green fs-14 fw-semibold text-white py-2 px-3 rounded-3">E-ticket issued</div>}
				</div>
			</div>
		</div>
	);
}
