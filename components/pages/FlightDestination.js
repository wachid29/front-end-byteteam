// Styles + Icons
import { FaPlaneDeparture } from "react-icons/fa";

export default function FlightDestination() {
	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="d-flex flex-column">
				<span className="fw-semibold lh-1 fs-28">IDN</span>
				<span className="text-gray">12:33</span>
			</div>
			<FaPlaneDeparture size={20} className="text-gray" />
			<div className="d-flex flex-column text-end">
				<span className="fw-semibold lh-1 fs-28">JPN</span>
				<span className="text-gray">15:21</span>
			</div>
		</div>
	);
}
