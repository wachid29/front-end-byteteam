// Components
import LayoutNavbar from "@components/layouts/LayoutNavbar";
import MyBookingCard from "@components/cards/MyBookingCard";

export default function MyBooking() {
	return (
		<LayoutNavbar title="My Booking - Ticketing Website" pageTitle="My Booking" hasChat hasNotif>
			<div className="d-flex flex-column gap-4 mb-5">
				<MyBookingCard status="waiting" />
				<MyBookingCard status="success" />
				<MyBookingCard status="cancel" />
			</div>
		</LayoutNavbar>
	);
}
