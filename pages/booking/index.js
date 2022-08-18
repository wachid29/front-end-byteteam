import { SWRConfig } from "swr";
import fetcher from "@utils/axios/fetcher";

// Components
import LayoutNavbar from "@components/layouts/LayoutNavbar";
import MyBookingList from "@components/lists/MyBookingList";

export default function MyBooking({ fallback }) {
	return (
		<LayoutNavbar title="My Booking - Ticketing Website" pageTitle="My Booking" hasChat hasNotif>
			<div className="d-flex flex-column gap-4 mb-5">
				<SWRConfig value={{ fallback }}>
					<MyBookingList />
				</SWRConfig>
			</div>
		</LayoutNavbar>
	);
}

export async function getServerSideProps() {
	const myBooking = await fetcher.findMyBooking();

	return {
		props: {
			fallback: {
				["myBooking"]: myBooking,
			},
		},
	};
}
