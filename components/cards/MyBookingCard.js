// Styles + Icons
import { container, zigzag, borderSpacer } from "@styles/components/Cards.module.css";
import { FaPlaneDeparture } from "react-icons/fa";

// Components
import BookingStatus from "@components/pages/BookingStatus";

export default function MyBookingCard({ status }) {
	return (
		<div className={container}>
			<div className={`d-flex flex-column bg-white ${zigzag}`}>
				<div className="d-flex flex-column p-4 gap-2">
					<span className="fs-14 fw-normal">Monday, 20 July &apos;20 - 12:33</span>
					<div className="d-flex align-items-center gap-4">
						<span className="fs-20 fw-semibold">IDN</span>
						<FaPlaneDeparture size={18} className="text-gray" />
						<span className="fs-20 fw-semibold">JPN</span>
					</div>
					<span className="fs-14 fw-normal text-gray">Garuda Indonesia, AB-221</span>
				</div>
				<div className={`d-flex align-items-center justify-content-between p-4 pb-5 ${borderSpacer}`}>
					<span className="fs-14 fw-semibold text-darkgray">Status</span>
					<BookingStatus status={status} />
				</div>
			</div>
		</div>
	);
}
