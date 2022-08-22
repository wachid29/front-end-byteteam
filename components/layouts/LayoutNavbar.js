import Head from "next/head";
import { useRouter } from "next/router";

// Styles + Icons
import { bgGradientWhite } from "@styles/components/Layouts.module.css";

// Components
import ChatNotifBtn from "@components/notification/ChatNotifBtn";
import Navbar from "@components/navbar/Navbar";

export default function LayoutNavbar(props) {
	const { title, pageTitle, page, hasChat = false, hasNotif = false, children } = props;
	const router = useRouter();

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>

			<main>
				<div className="d-flex justify-content-center min-vh-100">
					<div className={`d-flex flex-column position-relative align-items-center min-vh-100 mw-mobile ${bgGradientWhite}`}>
						<div className="d-flex flex-column p-4 pb-5 mb-5 h-100 w-100">
							<div className="d-flex align-items-center justify-content-between mt-3 pb-2 mb-4">
								<span className="fs-36 fw-semibold">{pageTitle}</span>
								{page !== "profile" && <ChatNotifBtn hasChat={hasChat} hasNotif={hasNotif} />}
								{page === "profile" && (
									<span className="fw-semibold fs-16 text-blue cursor-pointer" onClick={() => router.push("/profile/edit")}>
										Edit
									</span>
								)}
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
