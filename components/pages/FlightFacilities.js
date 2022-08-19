import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Styles + Icons
import { badgeFacilities } from "@styles/pages/FlightDetail.module.css";
import { FaHamburger, FaWifi, FaRestroom } from "react-icons/fa";
const colors = { snack: "bg-lightgreen", wifi: "bg-purple", restroom: "bg-orange" };

export default function FlightFacilities(props) {
	const { facilities } = props;
	const checkFacility = (facility) => colors[facility];

	return (
		<div className="d-flex flex-column gap-3 mb-4">
			<span className="fw-semibold fs-14">Facilities</span>
			<div>
				<Swiper modules={[FreeMode]} spaceBetween={15} slidesPerView={"auto"} freeMode>
					{facilities?.map((el) => (
						<SwiperSlide key={el.id_facility} className={`rounded-3 text-white px-4 ${badgeFacilities} ${checkFacility(el.facility)}`}>
							<div className="d-flex align-items-center justify-content-between h-100 gap-3">
								{el.facility === "snack" && <FaHamburger size={24} />}
								{el.facility === "wifi" && <FaWifi size={24} />}
								{el.facility === "restroom" && <FaRestroom size={24} />}
								<span className="fs-14 fw-semibold">{el.facility.replace(/\w/, (firstLetter) => firstLetter.toUpperCase())}</span>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
