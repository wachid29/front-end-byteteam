import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Styles + Icons
import "swiper/css/bundle";
import styles from "@styles/pages/FlightDetail.module.css";

// Components
import LayoutBgPlane from "@components/layouts/LayoutBgPlane";
import FlightDestination from "@components/pages/FlightDestination";
import FlightInfo from "@components/pages/FlightInfo";
import FlightPassanger from "@components/pages/FlightPassanger";
import FlightFacilities from "@components/pages/FlightFacilities";
import FlightCost from "@components/pages/FlightCost";

export default function FlightDetail() {
	return (
		<LayoutBgPlane title="Flight Detail - Ticketing Website">
			<div className={"d-flex flex-column bg-white position-relative mb-4 " + styles["flight-info"]}>
				<div className="d-flex flex-column px-4 pt-5 pb-4 gap-5">
					<FlightDestination />
					<FlightInfo />
				</div>
				<FlightPassanger />
			</div>
			<FlightFacilities />
			<FlightCost />
			<button className="btn btn-blue rounded-4 w-100 fw-bold py-3 mt-auto">BOOK FLIGHT</button>
		</LayoutBgPlane>
	);
}
