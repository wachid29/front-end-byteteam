import { QRCodeSVG } from "qrcode.react";

export default function BookingQrCode(props) {
	const { width, idBooking } = props;
	const url = `http://localhost:3000/admin/editBooking?id_booking=${idBooking}&status_payment=boarding`;

	return (
		<div className="d-flex justify-content-center py-4">
			<QRCodeSVG value={url} size={width} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"} includeMargin={false} />
		</div>
	);
}
