import Head from "next/head";

// Styles + Icons
import styles from "@styles/components/layouts/LayoutNavbar.module.css";

// Components
import ChatNotifBtn from "@components/notification/ChatNotifBtn";
import Navbar from "@components/navbar/Navbar";

export default function LayoutNavbar({ title, pageTitle, hasChat = false, hasNotif = false, children }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>

			<main>
				<div className="d-flex justify-content-center min-vh-100">
					<div className={"d-flex flex-column position-relative align-items-center min-vh-100 mw-mobile " + styles["bg-layout-navbar"]}>
						<div className="d-flex flex-column p-4 pb-5 mb-5 h-100 w-100">
							<div className="d-flex align-items-center justify-content-between my-4">
								<span className="fs-36 fw-semibold">{pageTitle}</span>
								<ChatNotifBtn hasChat={hasChat} hasNotif={hasNotif} />
							</div>
							{children}
						</div>
						<Navbar />
					</div>
				</div>
			</main>
		</div>
	);
}
