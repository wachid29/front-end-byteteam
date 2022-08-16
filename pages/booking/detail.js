// Styles + Icons
import { container, zigzag, borderSpacer } from "@styles/components/Cards.module.css";

// Components
import LayoutBgBlue from "@components/layouts/LayoutBgBlue";
import BookingStatus from "@components/pages/BookingStatus";
import BookingDeparture from "@components/pages/BookingDeparture";
import FlightAirlineLogo from "@components/pages/FlightAirlineLogo";
import FlightDestination from "@components/pages/FlightDestination";
import FlightInfo from "@components/pages/FlightInfo";
import BookingQrCode from "@components/pages/BookingQrCode";

export default function BookingDetail() {
	return (
		<LayoutBgBlue title="Booking Detail - Ticketing Website" pageTitle="Booking Pass">
			<div className={container}>
				<div className={`d-flex flex-column bg-white ${zigzag}`}>
					<div className="d-flex flex-column justify-content-center p-5 pb-4 gap-4">
						<FlightAirlineLogo width={100} justify="center" />
						<FlightDestination fontSize={26} justify="evenly" />
						<div className="d-flex justify-content-center">
							<BookingStatus status="success" />
						</div>
					</div>
					<div className={`d-flex flex-column justify-content-center p-5 pt-4 gap-4 ${borderSpacer}`}>
						<FlightInfo />
						<BookingDeparture />
						<BookingQrCode width={186} />
					</div>
				</div>
			</div>
		</LayoutBgBlue>
	);
}
