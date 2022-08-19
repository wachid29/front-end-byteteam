import fetcher from "@utils/axios/fetcher";

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

export default function BookingDetail({ ticket }) {
	return (
		<LayoutBgBlue title="Booking Detail - Ticketing Website" pageTitle="Booking Pass">
			<div className={container}>
				<div className={`d-flex flex-column bg-white pb-4 ${zigzag}`}>
					<div className="d-flex flex-column justify-content-center p-5 pb-4 gap-4">
						<FlightAirlineLogo width={100} justify="center" src={ticket?.logo} />
						<FlightDestination fontSize={26} justify="evenly" from={ticket?.place1[0]} to={ticket?.place2[0]} />
						<div className="d-flex justify-content-center">
							<BookingStatus status="success" />
						</div>
					</div>
					<div className={`d-flex flex-column justify-content-center p-5 pt-4 gap-4 ${borderSpacer}`}>
						<FlightInfo
							code_airplane={ticket?.code_airplane}
							class_flight={ticket?.class_flight}
							from_terminal={ticket?.from_terminal}
							from_gate={ticket?.from_gate}
						/>
						<BookingDeparture from_date={ticket?.from_date} from_time={ticket?.from_time} />
						<BookingQrCode width={186} />
					</div>
				</div>
			</div>
		</LayoutBgBlue>
	);
}

export async function getServerSideProps({ query }) {
	const ticket = await fetcher.findOneticket(query.id_ticket);

	return { props: { ticket } };
}
