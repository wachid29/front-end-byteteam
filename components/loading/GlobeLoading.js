import Lottie from "lottie-react";

// Styles + Icons
import globeIcon from "@public/images/lottie/globe.json";

export default function GlobeLoading() {
	return (
		<div className="d-flex flex-column align-items-center justify-content-center h-100">
			<div className="w-25">
				<Lottie animationData={globeIcon} loop={true} />
			</div>
			<span className="fs-14 fw-medium">Loading...</span>
		</div>
	);
}
