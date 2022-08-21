// Styles + Icons
import { FaPlaneDeparture } from "react-icons/fa";

export default function FlightDestination(props) {
	const { fontSize, iconSize, justify, hasTime = false, from, to, fromTime, toTime } = props;

	return (
		<div className={`d-flex justify-content-${justify || "between"} align-items-center`}>
			<div className="d-flex flex-column">
				<span className={`fw-semibold lh-1 fs-${fontSize || 28}`}>{from?.city_code}</span>
				{hasTime && <span className="text-gray">{fromTime?.split(":").splice(0, 2).join(":")}</span>}
			</div>
			<FaPlaneDeparture size={iconSize || 20} className="text-gray" />
			<div className="d-flex flex-column text-end">
				<span className={`fw-semibold lh-1 fs-${fontSize || 28}`}>{to?.city_code}</span>
				{hasTime && <span className="text-gray">{toTime?.split(":").splice(0, 2).join(":")}</span>}
			</div>
		</div>
	);
}
