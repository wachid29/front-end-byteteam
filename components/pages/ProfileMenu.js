import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import Swal from "sweetalert2";

// Styles + Icons
import { BsFillStarFill, BsFillGearFill } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function ProfileMenu() {
	const router = useRouter();

	const onLogout = () => {
		Swal.fire({
			icon: "question",
			text: "Are you sure to logout?",
			showCancelButton: true,
			confirmButtonText: "Sure",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteCookie("token");
				deleteCookie("datas");
				return router.push("/login");
			}
			return null;
		});
	};

	return (
		<div className="d-flex flex-column w-100 mt-4 px-3 gap-4">
			{/* <div className="d-flex align-items-center cursor-pointer gap-5">
				<BsFillStarFill size={22} className="text-gray" />
				<span className="fs-14 fw-semibold text-black">My Review</span>
				<FaAngleRight size={22} className="ms-auto text-gray" />
			</div>
			<div className="d-flex align-items-center cursor-pointer gap-5">
				<BsFillGearFill size={22} className="text-gray" />
				<span className="fs-14 fw-semibold text-black">Settings</span>
				<FaAngleRight size={22} className="ms-auto text-gray" />
			</div> */}
			<div className="d-flex align-items-center cursor-pointer gap-5" onClick={() => onLogout()}>
				<MdLogout size={22} className="text-red" />
				<span className="fs-14 fw-semibold text-red">Logout</span>
				<FaAngleRight size={22} className="ms-auto text-red" />
			</div>
		</div>
	);
}
