import fetcher from "@utils/axios/fetcher";

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

export default function FlightDetail(props) {
	const { ticket, child, adults } = props;

	const createBooking = () => {
		const data = {
			id_user: 1,
			user_role: "customer",
			id_ticket: ticket.id_ticket,
			total_passenger: parseInt(child) + parseInt(adults),
			total_payment: ticket?.price * (parseInt(child) + parseInt(adults)),
		};
		fetcher.postBooking(data).then((res) => console.log(res));
	};

	return (
		<LayoutBgPlane title="Flight Detail - Ticketing Website">
			<div className={flightInfo}>
				<div className={`d-flex flex-column bg-white mb-4 py-5 ${zigzag}`}>
					<div className="d-flex flex-column px-4 pb-4 gap-5">
						<FlightDestination hasTime from={ticket?.place1[0]} fromTime={ticket?.from_time} to={ticket?.place2[0]} toTime={ticket?.to_time} />
						<FlightAirlineLogo width={75} src={ticket?.logo} />
						<FlightInfo
							code_airplane={ticket?.code_airplane}
							class_flight={ticket?.class_flight}
							from_terminal={ticket?.from_terminal}
							from_gate={ticket?.from_gate}
						/>
					</div>
					<FlightPassanger child={child} adults={adults} />
				</div>
			</div>
			<FlightFacilities facilities={ticket?.facility} />
			<FlightCost cost={ticket?.price * (parseInt(child) + parseInt(adults))} />
			<button className="btn btn-blue rounded-4 w-100 fw-bold py-3 mt-auto" onClick={createBooking}>
				BOOK FLIGHT
			</button>
		</LayoutBgPlane>
	);
}

export async function getServerSideProps({ query }) {
	const { id, peopleChild, peopleAdult } = query;
	const ticket = await fetcher.findOneticket(id);

	return {
		props: {
			ticket,
			child: peopleChild,
			adults: peopleAdult,
		},
	};
}
