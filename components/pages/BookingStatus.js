export default function BookingStatus(props) {
	const { status } = props;

	return (
		<>
			{status === "waiting" && <div className="bg-lightorange fs-14 fw-semibold text-white py-2 px-3 rounded-3">Waiting for payment</div>}
			{status === "cancel" && <div className="bg-red fs-14 fw-semibold text-white py-2 px-3 rounded-3">Canceled</div>}
			{status === "success" && <div className="bg-green fs-14 fw-semibold text-white py-2 px-3 rounded-3">E-ticket issued</div>}
		</>
	);
}
