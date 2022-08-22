import { useState } from "react";
import { useRouter } from "next/router";
import { getCookie, hasCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";
import fetcher from "@utils/axios/fetcher";
import Swal from "sweetalert2";

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
	const { user, ticket, child, adults } = props;
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const createBooking = () => {
		setIsLoading(true);
		if (user) {
			const data = {
				id_user: user.id,
				user_role: "customer",
				id_ticket: ticket.id_ticket,
				total_passenger: parseInt(child) + parseInt(adults),
				total_payment: ticket?.price * (parseInt(child) + parseInt(adults)),
			};
			fetcher
				.postBooking(data)
				.then(() => {
					Swal.fire({
						icon: "success",
						text: "Ticket Booked Successfully",
					}).then((result) => (result.isConfirmed ? router.replace("/booking") : null));
				})
				.catch(() => {
					Swal.fire({
						icon: "error",
						text: "Something Wrong!",
					});
				})
				.finally(() => setIsLoading(false));
		} else {
			setIsLoading(false);
			router.push("/register");
		}
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
			<button className="btn btn-blue rounded-3 w-100 fw-bold py-3 mt-auto" onClick={createBooking} disabled={isLoading}>
				{isLoading && <span className="spinner-border spinner-border-sm me-2"></span>}
				{isLoading ? "Loading..." : "BOOK FLIGHT"}
			</button>
		</LayoutBgPlane>
	);
}

export async function getServerSideProps({ req, query }) {
	const user = hasCookie("datas", { req }) && hasCookie("token", { req }) ? decryptData(getCookie("datas", { req })) : null;
	const { id, peopleChild, peopleAdult } = query;
	const ticket = await fetcher.findOneticket(id);

	console.log(user);

	return {
		props: {
			user,
			ticket,
			child: peopleChild,
			adults: peopleAdult,
		},
	};
}
