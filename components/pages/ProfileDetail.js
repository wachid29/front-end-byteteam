// Styles + Icons
import { MdLocationOn } from "react-icons/md";

export default function ProfileDetail(props) {
	const { name, city, country } = props;

	return (
		<div className="d-flex flex-column align-items-center gap-2">
			<span className="text-black fs-20 fw-semibold">{name}</span>
			<div className="d-flex align-items-center gap-1">
				<MdLocationOn size={22} className="text-blue" />
				<span className="text-darkgray fs-14">{city && country ? `${city}, ${country}` : "-"}</span>
			</div>
		</div>
	);
}
