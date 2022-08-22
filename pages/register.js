import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@utils/validations";
import fetcher from "@utils/axios/fetcher";
import Swal from "sweetalert2";

// Styles + Icons
import { borderSpacer } from "@styles/components/Cards.module.css";

// Components
import LayoutAuth from "@components/layouts/LayoutAuth";
import Input from "@components/inputs/Input";

export default function Register() {
	const [isLoading, setIsLoading] = useState(false);
	const formOptions = { resolver: yupResolver(RegisterSchema) };
	const methods = useForm(formOptions);
	const router = useRouter();

	const onSubmit = (data) => {
		const { acceptTerms, ...newUser } = { ...data, role: "customer" };
		setIsLoading(true);
		fetcher
			.register(newUser)
			.then((res) => {
				Swal.fire({
					icon: "success",
					text: res,
				}).then((result) => (result.isConfirmed ? router.replace("/login") : null));
			})
			.catch((err) =>
				Swal.fire({
					icon: "error",
					text: `${err?.response?.data}`,
				})
			)
			.finally(() => setIsLoading(false));
	};

	return (
		<LayoutAuth title="Register - Ticketing Website" pageTitle="Register">
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<div className="d-flex flex-column align-items-center py-4 gap-4">
						<Input type="text" name="fullname" placeholder="Full Name" />
						<Input type="email" name="email" placeholder="Email" />
						<Input type="password" name="password" placeholder="Password" />
						<button className="btn btn-blue rounded-3 w-100 fs-18 fw-bold py-3" type="submit" disabled={isLoading}>
							{isLoading && <span className="spinner-border spinner-border-sm me-2"></span>}
							{isLoading ? "Loading..." : "Sign Up"}
						</button>
						<Input type="checkbox" name="acceptTerms" placeholder="Accept terms and condition" />
						<div className={`w-75 ${borderSpacer}`}></div>
						<div className="text-center">
							<span className="lato fs-14 text-darkgray">Already have an account?</span>
						</div>
						<NextLink href="/login">
							<button className="btn btn-outline-blue rounded-3 w-100 fs-18 fw-bold py-3" type="button">
								Sign In
							</button>
						</NextLink>
					</div>
				</form>
			</FormProvider>
		</LayoutAuth>
	);
}
