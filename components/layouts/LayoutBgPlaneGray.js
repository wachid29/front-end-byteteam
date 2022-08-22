import Head from "next/head";
import { useRouter } from "next/router";

// Styles + Icons
import { bgPlane2, bgPlaneGray, dateBadge } from "@styles/components/Layouts.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";

export default function LayoutBgPlaneGray(props) {
	const { title, children, date, placeFrom, placeTo, peopleAdult, peopleChild, classFlight } = props;
	const router = useRouter();

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>

			<main>
				<div className="d-flex justify-content-center min-vh-100">
					<div className="d-flex flex-column align-items-center mw-mobile">
						<div className={`d-flex flex-column bg-light w-100 ${bgPlaneGray}`}>
							<div className={`w-100 ${bgPlane2}`}>
								<div className="d-flex flex-column justify-content-between p-4 h-100 w-100">
									<div className="d-flex justify-content-between align-items-center">
										<FaAngleLeft className="text-white cursor-pointer my-3 mb-4" size={30} onClick={() => router.back()} />
										<span className={`fw-semibold py-2 px-4 rounded-2 text-white ${dateBadge}`}>{date}</span>
									</div>
									<div className="d-flex flex-column justify-content-between gap-1">
										<div className="d-flex justify-content-between">
											<span className="lato text-white">From</span>
											<span className="lato text-white">To</span>
										</div>
										<div className="d-flex justify-content-between">
											<span className="fs-20 text-white fw-semibold">{placeFrom.city}</span>
											<div>
												<BsArrowLeftRight size={20} className="text-white" />
											</div>
											<span className="fs-20 text-white fw-semibold">{placeTo.city}</span>
										</div>
										<div className="d-flex justify-content-between">
											<span className="lato text-white fw-light">{placeFrom.country}</span>
											<span className="lato text-white fw-light">{placeFrom.country}</span>
										</div>
									</div>
								</div>
							</div>
							<div className="d-flex flex-column p-4">
								<div className="row m-0">
									<div className="col-8 p-0">
										<span className="lato text-gray">Passenger</span>
									</div>
									<div className="col-4 p-0">
										<span className="lato text-gray">Class</span>
									</div>
								</div>

								<div className="row m-0">
									<div className="col-8 p-0">
										<span className="lato fs-18 fw-semibold text-darkgray">{`${peopleChild} Child | ${peopleAdult} Adult`}</span>
									</div>
									<div className="col-4 p-0">
										<span className="lato fs-18 fw-semibold text-darkgray">{classFlight}</span>
									</div>
								</div>
							</div>
						</div>
						{children}
					</div>
				</div>
			</main>
		</div>
	);
}
