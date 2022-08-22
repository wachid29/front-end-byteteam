import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditProfileSchema } from "@utils/validations";
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";
import fetcher from "@utils/axios/fetcher";
import Swal from "sweetalert2";

// Components
import LayoutBgWhite from "@components/layouts/LayoutBgWhite";
import Input from "@components/inputs/Input";
import EditProfilePhoto from "@components/pages/EditProfilePhoto";

export default function EditProfile(props) {
	const { place, profile } = props;
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const formOptions = { resolver: yupResolver(EditProfileSchema) };
	const methods = useForm({
		...formOptions,
		defaultValues: {
			email: profile.email,
			phoneNumber: profile.phone_number,
			fullname: profile.fullname,
			address: profile.id_place,
			postCode: profile.post_code,
		},
	});

	const onSubmitBiodata = (data) => {
		setIsLoading(true);
		const newData = {
			id: profile.id,
			fullname: data.fullname,
			email: data.email,
			phone_number: data.phoneNumber,
			id_place: parseInt(data.address),
			post_code: parseInt(data.postCode),
		};

		if (data.email === profile.email) {
			delete newData.email;
		}

		if (data.phoneNumber.toString() === profile.phone_number.toString()) {
			delete newData.phone_number;
		}

		fetcher
			.editProfile(newData)
			.then(() => {
				Swal.fire({
					icon: "success",
					text: "Edit Profile Success",
				}).then((result) => (result.isConfirmed ? router.push("/profile") : null));
			})
			.catch((err) => {
				Swal.fire({
					icon: "error",
					text: `${err?.response?.data}`,
				});
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<LayoutBgWhite title="Edit Profile - Ticketing Website" pageTitle="Edit Profile">
			<div className="d-flex flex-column gap-5">
				<EditProfilePhoto id={profile.id} />
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmitBiodata)}>
						<div className="d-flex flex-column gap-5">
							<div className="d-flex flex-column gap-4">
								<span className="fs-18 text-black fw-semibold">Contact</span>
								<div className="d-flex flex-column gap-4">
									<Input type="email" name="email" label="Email" withLabel />
									<Input type="text" name="phoneNumber" label="Phone Number" withLabel />
								</div>
							</div>
							<div className="d-flex flex-column gap-4">
								<span className="fs-18 text-black fw-semibold">Biodata</span>
								<div className="d-flex flex-column gap-4">
									<Input type="text" name="fullname" label="Full Name" withLabel />
									<Input type="select" name="address" label="Address" data={place} withLabel />
									<Input type="number" name="postCode" label="Post Code" withLabel />
								</div>
							</div>
						</div>
						<button className="btn btn-blue w-100 fs-16 fw-bold py-3 mt-4" type="submit" disabled={isLoading}>
							{isLoading && <span className="spinner-border spinner-border-sm me-2"></span>}
							{isLoading ? "Loading..." : "Save"}
						</button>
					</form>
				</FormProvider>
			</div>
		</LayoutBgWhite>
	);
}

export const getServerSideProps = async ({ req }) => {
	if (hasCookie("token", { req }) && hasCookie("datas", { req })) {
		const user = decryptData(getCookie("datas", { req }));
		const profile = await fetcher.getProfile(user.id);
		const place = await fetcher.getPlace();

		return {
			props: { place, profile },
		};
	}

	return {
		redirect: {
			destination: "/login",
			permanent: true,
		},
	};
};
