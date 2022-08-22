import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";
import fetcher from "@utils/axios/fetcher";

// Components
import LayoutNavbar from "@components/layouts/LayoutNavbar";
import ProfilePhoto from "@components/pages/ProfilePhoto";
import ProfileDetail from "@components/pages/ProfileDetail";
import ProfileMenu from "@components/pages/ProfileMenu";

export default function Profile(props) {
	const { user, city } = props;

	return (
		<LayoutNavbar title="My Profile - Ticketing Website" pageTitle="Profile" page="profile">
			<div className="d-flex flex-column align-items-center gap-4">
				<ProfilePhoto photo={user?.photo} />
				<ProfileDetail name={user?.fullname} city={city?.city} country={city?.country} />
				<ProfileMenu />
			</div>
		</LayoutNavbar>
	);
}

export const getServerSideProps = async ({ req }) => {
	if (hasCookie("token", { req }) && hasCookie("datas", { req })) {
		const user = decryptData(getCookie("datas", { req }));
		const userProfile = await fetcher.getProfile(user?.id);
		const city = userProfile.id_place ? await fetcher.findOnePlace(userProfile?.id_place) : null;

		return {
			props: {
				user: userProfile,
				city,
			},
		};
	}

	return {
		redirect: {
			destination: "/register",
			permanent: true,
		},
	};
};
