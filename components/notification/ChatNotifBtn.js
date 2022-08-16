// Styles + Icons
import styles from "@styles/components/layouts/LayoutNavbar.module.css";
import { BiEnvelope, BiBell } from "react-icons/bi";

export default function ChatNotifBtn({ hasChat, hasNotif }) {
	return (
		<div className="d-flex gap-3">
			<div className="position-relative cursor-pointer">
				{hasChat && <span className={"position-absolute bg-blue rounded-circle " + styles["dot-badge"]}></span>}
				<BiEnvelope size={32} className="text-darkgray" />
			</div>
			<div className="position-relative cursor-pointer">
				{hasNotif && <span className={"position-absolute bg-blue rounded-circle " + styles["dot-badge"]}></span>}
				<BiBell size={32} className="text-darkgray" />
			</div>
		</div>
	);
}
