import { useRouter } from "next/router";

// Styles + Icons
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { FaCompass } from "react-icons/fa";

export default function Navbar() {
	const router = useRouter();

	const activeNav = (path) => (router.pathname == path ? "text-blue" : "text-gray");

	return (
		<div className="position-fixed bottom-0 mw-mobile d-flex justify-content-center align-items-center bg-white w-100 gap-3 p-3">
			<div className={"d-flex flex-column align-items-center w-25 cursor-pointer " + activeNav("/my-booking")}>
				<MdOutlineAirplaneTicket size={30} />
				<span className="fs-10 fw-medium">My Booking</span>
			</div>
			<div className={"d-flex flex-column align-items-center w-25 cursor-pointer " + activeNav("/search")}>
				<div className="rounded-circle bg-blue p-3">
					<FaCompass size={30} className="text-white" />
				</div>
			</div>
			<div className={"d-flex flex-column align-items-center w-25 cursor-pointer " + activeNav("/profile")}>
				<BiUserCircle size={30} />
				<span className="fs-10 fw-medium">Profile</span>
			</div>
		</div>
	);
}
