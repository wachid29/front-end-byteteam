import { SWRConfig } from "swr";
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";
import fetcher from "@utils/axios/fetcher";

// Components
import LayoutNavbar from "@components/layouts/LayoutNavbar";
import MyBookingList from "@components/lists/MyBookingList";

export default function MyBooking({ fallback, id }) {
	return (
		<LayoutNavbar title="My Booking - Ticketing Website" pageTitle="My Booking" page="mybooking" hasChat hasNotif>
			<div className="d-flex flex-column h-100 gap-4 mb-5">
				<SWRConfig value={{ fallback }}>
					<MyBookingList id={id} />
				</SWRConfig>
			</div>
		</LayoutNavbar>
	);
}

export async function getServerSideProps({ req }) {
	if (hasCookie("token", { req }) && hasCookie("datas", { req })) {
		const user = decryptData(getCookie("datas", { req }));
		const myBooking = await fetcher.findMyBooking(user.id).catch(() => null);

		return {
			props: {
				id: user.id,
				fallback: {
					["myBooking"]: myBooking,
				},
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
