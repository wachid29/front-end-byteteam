import Head from "next/head";
import { useRouter } from "next/router";

// Styles + Icons
import { FaAngleLeft } from "react-icons/fa";

export default function LayoutAuth(props) {
	const { title, pageTitle, children } = props;
	const router = useRouter();

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>

			<main>
				<div className="d-flex justify-content-center min-vh-100">
					<div className="d-flex flex-column position-relative align-items-center mw-mobile">
						<div className="d-flex flex-column p-4 h-100 w-100 bg-white">
							<FaAngleLeft className="text-black cursor-pointer my-3 mb-4" size={30} onClick={() => router.back()} />
							<div className="d-flex flex-column mt-5 h-100">
								<span className="fs-36 fw-semibold text-black">{pageTitle}</span>
								{children}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
