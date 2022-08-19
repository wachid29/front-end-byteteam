export default function FlightCost(props) {
	const { cost } = props;
	const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });

	return (
		<div className="d-flex justify-content-between align-items-center">
			<span className="fs-14 fw-semibold text-gray">Total you&apos;ll pay</span>
			<span className="fs-24 fw-bold text-blue">{formatter.format(cost)}</span>
		</div>
	);
}
