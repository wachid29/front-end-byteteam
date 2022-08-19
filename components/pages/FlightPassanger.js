// Styles + Icons
import { badgeRounded } from "@styles/pages/FlightDetail.module.css";
import { borderSpacer } from "@styles/components/Cards.module.css";

export default function FlightPassanger(props) {
	const { child, adults } = props;

	return (
		<div className={`d-flex justify-content-between p-4 ${borderSpacer}`}>
			<div className="d-flex align-items-center gap-3">
				<div className={`d-flex justify-content-center align-items-center rounded-circle ${badgeRounded}`}>
					<span className="text-blue fw-bold fs-18 lh-1">{child}</span>
				</div>
				<span className="text-gray fs-14">Child</span>
			</div>
			<div className="d-flex align-items-center gap-3">
				<div className={`d-flex justify-content-center align-items-center rounded-circle ${badgeRounded} `}>
					<span className="text-blue fw-bold fs-18 lh-1">{adults}</span>
				</div>
				<span className="text-gray fs-14">Adults</span>
			</div>
		</div>
	);
}
