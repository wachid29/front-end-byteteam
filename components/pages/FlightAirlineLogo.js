export default function FlightAirlineLogo(props) {
	const { justify, width } = props;

	return (
		<div className={`d-flex justify-content-${justify || "start"}`}>
			<img src="/images/garuda-indonesia.png" alt="airline-logo" width={width} />
		</div>
	);
}
