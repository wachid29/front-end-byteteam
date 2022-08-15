// Styles + Icons
import styles from "@styles/pages/FlightDetail.module.css";

export default function FlightPassanger() {
	return (
		<div className={"d-flex justify-content-between p-4 " + styles["border-spacer"]}>
			<div className="d-flex align-items-center gap-3">
				<div className={"d-flex justify-content-center align-items-center rounded-circle " + styles["badge-rounded"]}>
					<span className="text-blue fw-bold fs-18 lh-1">2</span>
				</div>
				<span className="text-gray fs-14">Child</span>
			</div>
			<div className="d-flex align-items-center gap-3">
				<div className={"d-flex justify-content-center align-items-center rounded-circle " + styles["badge-rounded"]}>
					<span className="text-blue fw-bold fs-18 lh-1">4</span>
				</div>
				<span className="text-gray fs-14">Adults</span>
			</div>
		</div>
	);
}
