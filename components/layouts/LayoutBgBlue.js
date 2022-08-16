import Head from "next/head";

// Styles + Icons
import { FaAngleLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function LayoutBgBlue(props) {
	const { title, pageTitle, children } = props;

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>

			<main>
				<div className="d-flex justify-content-center min-vh-100">
					<div className="d-flex flex-column position-relative align-items-center mw-mobile">
						<div className="d-flex flex-column p-4 h-100 w-100 bg-blue">
							<div className="d-flex align-items-center mt-3 mb-4 gap-5">
								<FaAngleLeft className="text-white cursor-pointer" size={30} />
								<span className="fs-16 fw-semibold text-white">{pageTitle}</span>
								<BsThreeDotsVertical className="ms-auto text-white cursor-pointer" size={30} />
							</div>
							{children}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
