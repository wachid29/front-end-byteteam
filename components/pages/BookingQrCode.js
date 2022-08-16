export default function BookingQrCode(props) {
	const { width } = props;

	return (
		<div className="d-flex justify-content-center">
			<img src="/images/qr-code.png" alt="airline-logo" width={width} />
		</div>
	);
}
