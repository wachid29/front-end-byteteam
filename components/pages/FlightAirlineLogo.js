export default function FlightAirlineLogo(props) {
	const { justify, width, src } = props;

	return (
		<div className={`d-flex justify-content-${justify || "start"}`}>
			<img src={src} alt="airline-logo" width={width} />
		</div>
	);
}
