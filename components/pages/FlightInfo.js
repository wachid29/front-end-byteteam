export default function FlightInfo(props) {
	const { code_airplane, class_flight, from_terminal, from_gate } = props;

	return (
		<div className="d-flex justify-content-between">
			<div className="d-flex flex-column">
				<span className="fs-12 text-lightgray">Code</span>
				<span className="fs-14 text-darkgray fw-medium">{code_airplane}</span>
			</div>
			<div className="d-flex flex-column">
				<span className="fs-12 text-lightgray">Class</span>
				<span className="fs-14 text-darkgray fw-medium">{class_flight}</span>
			</div>
			<div className="d-flex flex-column">
				<span className="fs-12 text-lightgray">Terminal</span>
				<span className="fs-14 text-darkgray fw-medium">{from_terminal}</span>
			</div>
			<div className="d-flex flex-column">
				<span className="fs-12 text-lightgray">Gate</span>
				<span className="fs-14 text-darkgray fw-medium">{from_gate}</span>
			</div>
		</div>
	);
}
