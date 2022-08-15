import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Styles + Icons
import "swiper/css/bundle";
import styles from "@styles/pages/FlightDetail.module.css";
import { FaHamburger, FaWifi, FaRestroom } from "react-icons/fa";

export default function FlightFacilities() {
	return (
		<div className="d-flex flex-column gap-3 mb-4">
			<span className="fw-semibold fs-14">Facilities</span>
			<div>
				<Swiper modules={[FreeMode]} spaceBetween={15} slidesPerView={"auto"} freeMode>
					<SwiperSlide className={"rounded-3 text-white bg-lightgreen px-4 " + styles["badge-fasilities"]}>
						<div className="d-flex align-items-center justify-content-between h-100 gap-3">
							<FaHamburger size={24} />
							<span className="fs-14 fw-semibold">Snack</span>
						</div>
					</SwiperSlide>
					<SwiperSlide className={"rounded-3 text-white bg-purple px-4 " + styles["badge-fasilities"]}>
						<div className="d-flex align-items-center justify-content-between h-100 gap-3">
							<FaWifi size={24} />
							<span className="fs-14 fw-semibold">Wifi</span>
						</div>
					</SwiperSlide>
					<SwiperSlide className={"rounded-3 text-white bg-orange px-4 " + styles["badge-fasilities"]}>
						<div className="d-flex align-items-center justify-content-between h-100 gap-3">
							<FaRestroom size={24} />
							<span className="fs-14 fw-semibold">Restroom</span>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
}
