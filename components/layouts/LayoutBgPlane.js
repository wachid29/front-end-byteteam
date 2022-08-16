import Head from "next/head";

// Styles + Icons
import styles from "@styles/components/LayoutBgPlane.module.css";
import { FaAngleLeft } from "react-icons/fa";

export default function LayoutBgPlane({ title, children }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>

			<main>
				<div className="d-flex justify-content-center min-vh-100">
					<div className="d-flex flex-column position-relative align-items-center mw-mobile">
						<div className={"w-100 position-absolute " + styles["bg-plane"]}></div>
						<div className="d-flex flex-column p-4 h-100 w-100">
							<FaAngleLeft className="text-white cursor-pointer mt-5 mb-4" size={30} />
							{children}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
