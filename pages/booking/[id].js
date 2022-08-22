import { hasCookie } from "cookies-next";
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

export default function BookingDetail({ booking }) {
	return (
		<LayoutBgBlue title="Booking Detail - booking Website" pageTitle="Booking Pass">
			<div className={container}>
				<div className={`d-flex flex-column bg-white pb-4 ${zigzag}`}>
					<div className="d-flex flex-column justify-content-center p-5 pb-4 gap-4">
						<FlightAirlineLogo width={100} justify="center" src={booking?.logo} />
						<FlightDestination fontSize={26} justify="evenly" from={booking?.place1[0]} to={booking?.place2[0]} />
						<div className="d-flex justify-content-center">
							<BookingStatus status="success" />
						</div>
					</div>
					<div className={`d-flex flex-column justify-content-center p-5 pt-4 gap-4 ${borderSpacer}`}>
						<FlightInfo
							code_airplane={booking?.code_airplane}
							class_flight={booking?.class_flight}
							from_terminal={booking?.from_terminal}
							from_gate={booking?.from_gate}
						/>
						<BookingDeparture from_date={booking?.from_date} from_time={booking?.from_time} />
						<BookingQrCode width={186} idBooking={booking?.id_booking} />
					</div>
				</div>
			</div>
		</LayoutBgBlue>
	);
}

export async function getServerSideProps({ req, query }) {
	if (hasCookie("token", { req }) && hasCookie("datas", { req })) {
		const booking = await fetcher.findOneBooking(query.id);
		const { logo } = await fetcher.findOneticket(booking?.id_ticket);

		return {
			props: {
				booking: { ...booking, logo },
			},
		};
	}

	return {
		redirect: {
			destination: "/register",
			permanent: true,
		},
	};
}
