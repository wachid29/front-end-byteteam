import Head from "next/head";
import { useRouter } from "next/router";

// Styles + Icons
import { bgImage1 } from "@styles/components/Layouts.module.css";
import { FaAngleLeft } from "react-icons/fa";

export default function LayoutBgImg(props) {
	const { title, children } = props;
	const router = useRouter();

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>

			<main>
				<div className="d-flex justify-content-center min-vh-100">
					<div className="d-flex flex-column position-relative align-items-center mw-mobile">
						<div className={`w-100 position-absolute ${bgImage1}`}></div>
						<div className="d-flex flex-column p-4 h-100 w-100">
							<FaAngleLeft className="text-white cursor-pointer my-3 mb-4" size={30} onClick={() => router.back()} />
							{children}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
