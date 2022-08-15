export default function FlightInfo() {
	return (
		<>
			<div className="d-flex">
				<img src="/images/garuda-indonesia.png" alt="airline-logo" />
			</div>
			<div className="d-flex justify-content-between">
				<div className="d-flex flex-column">
					<span className="fs-12 text-lightgray">Code</span>
					<span className="fs-14 text-darkgray fw-semibold">AB-221</span>
				</div>
				<div className="d-flex flex-column">
					<span className="fs-12 text-lightgray">Class</span>
					<span className="fs-14 text-darkgray fw-semibold">Economy</span>
				</div>
				<div className="d-flex flex-column">
					<span className="fs-12 text-lightgray">Terminal</span>
					<span className="fs-14 text-darkgray fw-semibold">A</span>
				</div>
				<div className="d-flex flex-column">
					<span className="fs-12 text-lightgray">Gate</span>
					<span className="fs-14 text-darkgray fw-semibold">221</span>
				</div>
			</div>
		</>
	);
}
