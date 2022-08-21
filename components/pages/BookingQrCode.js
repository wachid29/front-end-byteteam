import { QRCodeSVG } from "qrcode.react";

export default function BookingQrCode(props) {
	const { width } = props;

	return (
		<div className="d-flex justify-content-center py-4">
			<QRCodeSVG value={"https://google.com"} size={width} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"} includeMargin={false} />
		</div>
	);
}
