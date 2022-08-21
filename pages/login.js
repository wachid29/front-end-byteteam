import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FaFingerprint } from "react-icons/fa";
import loginStyle from "../styles/pages/login.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

const login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLogin = () => {
		setIsLoading(true);
		axios
			.post(`https://ticket-byte-v1.herokuapp.com/auth/login`, {
				email,
				password,
			})
			.then((res) => {
				localStorage.setItem("token", res?.data?.token);
				localStorage.setItem("datas", JSON.stringify(res?.data?.datas));

				Swal.fire({
					icon: "success",
					text: "login successfully",
				}).then((result) => (result.isConfirmed ? router.replace("/") : null));
			})
			.catch((err) => {
				Swal.fire({
					icon: "error",
					text: err?.response?.data,
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return (
		<>
			<div className={loginStyle.main}>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-4">
							<div className=" row mt-4">
								<div className="col-12 mx-2">
									<div className={loginStyle.btnBack}>
										<IoIosArrowBack size={30} onClick={() => router.back()} />
									</div>
								</div>
							</div>
							<div className={`row mt-5 ${loginStyle.textLogin}`}>
								<div className="col-12 mx-3">
									<p>Login</p>
								</div>
							</div>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									handleLogin();
								}}>
								<div className={`px-3 ${loginStyle.formInput}`}>
									<input
										className="form-control form-control-lg mt-3 shadow-none"
										type="email"
										placeholder="Email"
										required
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className={`input-group px-3 ${loginStyle.inputGroup}`}>
									<input
										type="password"
										className="form-control form-control-lg mt-4 shadow-none"
										id="password"
										placeholder="Password"
										required
										onChange={(e) => setPassword(e.target.value)}
									/>
									<span className="input-group-text mt-4 shadow-none" id="basic-addon1">
										<MdOutlineRemoveRedEye size={25} color="#2395FF" />
									</span>
								</div>
								<div className={`d-grid gap-2 mt-4 px-3 ${loginStyle.btnLogin}`}>
									<button className="btn btn-lg" type="submit" disabled={isLoading}>
										{isLoading ? "Loading..." : "Sign In"}
									</button>
								</div>
								<div className={`text-center ${loginStyle.loginFooter}`}>
									<p className="mt-4 mb-2">Did you forgot your password?</p>
									<a className="">Tap here for reset</a>
								</div>
							</form>
							<hr className="mt-5 mx-3" />
							<div className={loginStyle.choiceSign}>
								<p>or sign in with</p>
							</div>
							<div className="row mx-1">
								<div className={`col-4 text-center ${loginStyle.btnChoice}`}>
									<button type="button" className="btn">
										<FcGoogle size={30} />
									</button>
								</div>
								<div className={`col-4 text-center ${loginStyle.btnChoice}`}>
									<button type="button" className="btn">
										<BsFacebook size={30} color="#4175DF" />
									</button>
								</div>
								<div className={`col-4 text-center ${loginStyle.btnChoice}`}>
									<button type="button" className="btn">
										<FaFingerprint size={30} color="#2395FF" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default login;
