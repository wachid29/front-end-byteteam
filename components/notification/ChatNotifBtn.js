// Styles + Icons
import { dotBadge } from "@styles/components/Layouts.module.css";
import { BiEnvelope, BiBell } from "react-icons/bi";

export default function ChatNotifBtn(props) {
	const { hasChat, hasNotif } = props;

	return (
		<div className="d-flex gap-3">
			<div className="position-relative cursor-pointer">
				{hasChat && <span className={`position-absolute bg-blue rounded-circle ${dotBadge}`}></span>}
				<BiEnvelope size={32} className="text-darkgray" />
			</div>
			<div className="position-relative cursor-pointer">
				{hasNotif && <span className={`position-absolute bg-blue rounded-circle ${dotBadge}`}></span>}
				<BiBell size={32} className="text-darkgray" />
			</div>
		</div>
	);
}
