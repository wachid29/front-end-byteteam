import moment from "moment";

export default function BookingDeparture(props) {
	const { from_date, from_time } = props;

	return (
		<div className="d-flex flex-column">
			<span className="fs-12 text-lightgray">Departure</span>
			<span className="fs-14 text-darkgray fw-medium">
				{moment(from_date).format("dddd, DD MMMM 'YY")} - {from_time?.split(":").splice(0, 2).join(":")}
			</span>
		</div>
	);
}
