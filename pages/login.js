import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@utils/validations";
import fetcher from "@utils/axios/fetcher";
import cookiesOptions from "@utils/cookies";
import { setCookie } from "cookies-next";
import { encryptData } from "@utils/crypto";
import Swal from "sweetalert2";

// Styles + Icons
import { borderSpacer } from "@styles/components/Cards.module.css";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FaFingerprint } from "react-icons/fa";

// Components
import LayoutAuth from "@components/layouts/LayoutAuth";
import Input from "@components/inputs/Input";

export default function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const formOptions = { resolver: yupResolver(LoginSchema) };
	const methods = useForm(formOptions);
	const router = useRouter();

	const onSubmit = (data) => {
		setIsLoading(true);
		fetcher
			.login(data)
			.then((res) => {
				setCookie("token", res?.token, cookiesOptions);
				setCookie("datas", encryptData(res?.datas), cookiesOptions);
				Swal.fire({
					icon: "success",
					text: res?.message,
				}).then((result) => {
					if (result.isConfirmed) {
						if (res?.datas?.role === "admin") return router.push("/admin");
						return router.push("/");
					}
					return null;
				});
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
		<LayoutAuth title="Login - Ticketing Website" pageTitle="Login">
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<div className="d-flex flex-column align-items-center py-4 gap-4">
						<Input type="email" name="email" placeholder="Email" />
						<Input type="password" name="password" placeholder="Password" />
						<button className="btn btn-blue rounded-3 w-100 fs-18 fw-bold py-3" type="submit" disabled={isLoading}>
							{isLoading && <span className="spinner-border spinner-border-sm me-2"></span>}
							{isLoading ? "Loading..." : "Sign In"}
						</button>
						{/* <div className="d-flex flex-column text-center gap-1">
							<span className="lato fs-16 text-darkgray">Did you forgot your password?</span>
							<a className="link-blue lato fs-16 cursor-pointer">Tap here for reset</a>
						</div>
						<div className={`w-75 ${borderSpacer}`}></div>
						<div className="text-center">
							<span className="lato fs-14 text-darkgray">or sign in with</span>
						</div>
						<div className="d-flex w-100 gap-3">
							<button type="button" className="btn btn-outline-blue flex-grow-1 py-3">
								<FcGoogle size={30} />
							</button>
							<button type="button" className="btn btn-outline-blue flex-grow-1 py-3">
								<BsFacebook size={30} />
							</button>
							<button type="button" className="btn btn-outline-blue flex-grow-1 py-3">
								<FaFingerprint size={30} />
							</button>
						</div> */}
					</div>
				</form>
			</FormProvider>
		</LayoutAuth>
	);
}
