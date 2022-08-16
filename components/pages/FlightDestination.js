// Styles + Icons
import { FaPlaneDeparture } from "react-icons/fa";

export default function FlightDestination(props) {
	const { fontSize, iconSize, justify, hasTime = false } = props;

	return (
		<div className={`d-flex justify-content-${justify || "between"} align-items-center`}>
			<div className="d-flex flex-column">
				<span className={`fw-semibold lh-1 fs-${fontSize || 28}`}>IDN</span>
				{hasTime && <span className="text-gray">12:33</span>}
			</div>
			<FaPlaneDeparture size={iconSize || 20} className="text-gray" />
			<div className="d-flex flex-column text-end">
				<span className={`fw-semibold lh-1 fs-${fontSize || 28}`}>JPN</span>
				{hasTime && <span className="text-gray">15:21</span>}
			</div>
		</div>
	);
}
