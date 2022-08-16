// Styles + Icons
import { flightInfo } from "@styles/pages/FlightDetail.module.css";
import { zigzag } from "@styles/components/Cards.module.css";

// Components
import LayoutBgPlane from "@components/layouts/LayoutBgPlane";
import FlightDestination from "@components/pages/FlightDestination";
import FlightAirlineLogo from "@components/pages/FlightAirlineLogo";
import FlightInfo from "@components/pages/FlightInfo";
import FlightPassanger from "@components/pages/FlightPassanger";
import FlightFacilities from "@components/pages/FlightFacilities";
import FlightCost from "@components/pages/FlightCost";

export default function FlightDetail() {
	return (
		<LayoutBgPlane title="Flight Detail - Ticketing Website">
			<div className={flightInfo}>
				<div className={`d-flex flex-column bg-white mb-4 py-5 ${zigzag}`}>
					<div className="d-flex flex-column px-4 pb-4 gap-5">
						<FlightDestination hasTime />
						<FlightAirlineLogo width={75} />
						<FlightInfo />
					</div>
					<FlightPassanger />
				</div>
			</div>
			<FlightFacilities />
			<FlightCost />
			<button className="btn btn-blue rounded-4 w-100 fw-bold py-3 mt-auto">BOOK FLIGHT</button>
		</LayoutBgPlane>
	);
}
