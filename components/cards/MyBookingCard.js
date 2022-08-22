import NextLink from "next/link";
import useSWR, { mutate } from "swr";
import fetcher from "@utils/axios/fetcher";
import moment from "moment";
import Swal from "sweetalert2";

// Styles + Icons
import { container, zigzag, borderSpacer } from "@styles/components/Cards.module.css";
import { FaPlaneDeparture, FaTimes } from "react-icons/fa";

// Components
import BookingStatus from "@components/pages/BookingStatus";
import BookingLoading from "@components/loading/BookingLoading";

export default function MyBookingCard(props) {
	const { user, booking } = props;
	const { data: ticket, error } = useSWR("ticket", () => fetcher.findOneticket(booking?.id_ticket));

	const onCancel = (idBooking) => {
		Swal.fire({
			icon: "question",
			text: "Are you sure to cancel this ticket?",
			showCancelButton: true,
			confirmButtonText: "Sure",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				mutate("myBooking");
				return fetcher.cancelTicket({ id_user: user, id_booking: idBooking });
			}
			return null;
		});
	};

	if (!ticket) return <BookingLoading />;
	if (booking?.status_payment === "issue")
		return (
			<NextLink href={`/booking/${booking?.id_booking}`}>
				<div className={`cursor-pointer ${container}`}>
					<div className={`d-flex flex-column bg-white ${zigzag}`}>
						<div className="d-flex flex-column p-4 gap-2">
							<span className="fs-14 fw-normal">
								{moment(ticket?.from_date).format("dddd, DD MMMM 'YY")} - {ticket?.from_time.split(":").splice(0, 2).join(":")}
							</span>
							<div className="d-flex align-items-center gap-4">
								<span className="fs-20 fw-semibold">{ticket?.place1[0]?.city_code}</span>
								<FaPlaneDeparture size={18} className="text-gray" />
								<span className="fs-20 fw-semibold">{ticket?.place2[0]?.city_code}</span>
							</div>
							<span className="fs-14 fw-normal text-gray">
								{ticket?.name}, {ticket?.code_airplane}
							</span>
						</div>
						<div className={`d-flex align-items-center justify-content-between p-4 pb-5 ${borderSpacer}`}>
							<span className="fs-14 fw-semibold text-darkgray">Status</span>
							<BookingStatus status={booking?.status_payment} />
						</div>
					</div>
				</div>
			</NextLink>
		);

	if (booking?.status_payment === "waiting")
		return (
			<div className={`cursor-pointer ${container}`}>
				<div className={`d-flex flex-column bg-white ${zigzag}`}>
					<div className="d-flex flex-column p-4 gap-2">
						<div className="d-flex justify-content-between">
							<span className="fs-14 fw-normal">
								{moment(ticket?.from_date).format("dddd, DD MMMM 'YY")} - {ticket?.from_time.split(":").splice(0, 2).join(":")}
							</span>
							<FaTimes size={20} onClick={() => onCancel(booking?.id_booking)} />
						</div>
						<div className="d-flex align-items-center gap-4">
							<span className="fs-20 fw-semibold">{ticket?.place1[0]?.city_code}</span>
							<FaPlaneDeparture size={18} className="text-gray" />
							<span className="fs-20 fw-semibold">{ticket?.place2[0]?.city_code}</span>
						</div>
						<span className="fs-14 fw-normal text-gray">
							{ticket?.name}, {ticket?.code_airplane}
						</span>
					</div>
					<div className={`d-flex align-items-center justify-content-between p-4 pb-5 ${borderSpacer}`}>
						<span className="fs-14 fw-semibold text-darkgray">Status</span>
						<BookingStatus status={booking?.status_payment} />
					</div>
				</div>
			</div>
		);

	return (
		<div className={`cursor-pointer ${container}`}>
			<div className={`d-flex flex-column bg-white ${zigzag}`}>
				<div className="d-flex flex-column p-4 gap-2">
					<span className="fs-14 fw-normal">
						{moment(ticket?.from_date).format("dddd, DD MMMM 'YY")} - {ticket?.from_time.split(":").splice(0, 2).join(":")}
					</span>
					<div className="d-flex align-items-center gap-4">
						<span className="fs-20 fw-semibold">{ticket?.place1[0]?.city_code}</span>
						<FaPlaneDeparture size={18} className="text-gray" />
						<span className="fs-20 fw-semibold">{ticket?.place2[0]?.city_code}</span>
					</div>
					<span className="fs-14 fw-normal text-gray">
						{ticket?.name}, {ticket?.code_airplane}
					</span>
				</div>
				<div className={`d-flex align-items-center justify-content-between p-4 pb-5 ${borderSpacer}`}>
					<span className="fs-14 fw-semibold text-darkgray">Status</span>
					<BookingStatus status={booking?.status_payment} />
				</div>
			</div>
		</div>
	);
}
