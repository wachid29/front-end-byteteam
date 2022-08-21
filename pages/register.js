/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import registerStyle from "../styles/pages/register.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";

const register = () => {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleRegister = () => {
		setIsLoading(true);
		axios
			.post(`https://ticket-byte-v1.herokuapp.com/auth/register`, {
				fullname,
				email,
				password,
				role: "customer",
			})
			.then((res) => {
				console.log(res);
				Swal.fire({
					icon: "success",
					text: "register successfully",
				}).then((result) => (result.isConfirmed ? router.replace("/login") : null));
			})
			.catch((err) => {
				console.log(err);
				Swal.fire({
					icon: "error",
					text: `${err?.response?.data}`,
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<>
			<div className={registerStyle.main}>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-4">
							<div className="row mt-4">
								<div className="col-4 px-3">
									<div className={registerStyle.iconBack}>
										<IoIosArrowBack size={32} onClick={() => router.back()} />
									</div>
								</div>
								<div className="col-8 mt-1 px-4">
									<div className={registerStyle.contentTop}>
										<p>Continue as Guest</p>
									</div>
								</div>
							</div>
							<div className={`row mt-5 ${registerStyle.textRegister}`}>
								<div className="col-12 mx-3">
									<p>Register</p>
								</div>
							</div>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									handleRegister();
								}}>
								<div className={`px-3 ${registerStyle.formInput}`}>
									<input
										className="form-control form-control-lg shadow-none mt-3"
										type="text"
										placeholder="Fullname"
										onChange={(e) => setFullname(e.target.value)}
										required
									/>
								</div>
								<div className={`px-3 ${registerStyle.formInput}`}>
									<input
										className="form-control form-control-lg shadow-none mt-3"
										type="email"
										placeholder="Email"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className={`input-group px-3 ${registerStyle.inputGroup}`}>
									<input
										type="password"
										className="form-control form-control-lg shadow-none mt-4"
										id="password"
										placeholder="Password"
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
									<span className="input-group-text shadow-none mt-4" id="basic-addon1">
										<MdOutlineRemoveRedEye size={25} color="#2395FF" />
									</span>
								</div>
								<div className={`d-grid gap-2 mt-4 px-3 ${registerStyle.btnRegister}`}>
									<button className="btn btn-lg" type="submit" disabled={isLoading}>
										{isLoading ? "Loading..." : "Sign Up"}
									</button>
								</div>
							</form>
							<div className={`form-check mt-3 mx-3 ${registerStyle.checkBox}`}>
								<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
								<label className="form-check-label" htmlFor="flexCheckDefault">
									Accept terms and condition
								</label>
							</div>
							<hr className="mt-4 mx-3" />
							<div className={`text-center ${registerStyle.registerFooter}`}>
								<p className="mt-4 mb-2">Already have an account?</p>
							</div>
							<div className={`d-grid gap-2 mt-4 px-3 ${registerStyle.btnRegister}`}>
								<Link href="/login" passHref>
									<button className="btn btn-lg" type="button">
										Sign In
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default register;
