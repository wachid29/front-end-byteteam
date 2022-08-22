import Image from "next/image";

// Styles + Icons
import { profileImg } from "@styles/pages/Profile.module.css";

export default function ProfilePhoto(props) {
	const { photo } = props;

	return (
		<div className={`position-relative rounded-circle ${profileImg}`}>
			<Image src={photo || "/images/photo_profile.png"} className="rounded-circle" alt="Photo Profile" layout="fill" priority />
		</div>
	);
}
