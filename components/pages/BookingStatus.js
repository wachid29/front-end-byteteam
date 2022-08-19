export default function BookingStatus(props) {
	const { status } = props;

	return (
		<>
			{status === "waiting" && <div className="bg-lightorange fs-14 fw-semibold text-white py-2 px-3 rounded-3">Waiting for payment</div>}
			{status === "canceled" && <div className="bg-red fs-14 fw-semibold text-white py-2 px-3 rounded-3">Canceled</div>}
			{status === "issue" && <div className="bg-green fs-14 fw-semibold text-white py-2 px-3 rounded-3">E-ticket issued</div>}
			{status === "boarding" && <div className="bg-gray fs-14 fw-semibold text-white py-2 px-3 rounded-3">Ticket Has Been Used</div>}
		</>
	);
}
