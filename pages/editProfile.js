/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, useEffect } from "react";
import profileStyle from "../styles/profile.module.css";
import Image from "next/image";
//import imgPlane from "../public/images/plane.png";
import { RiAlignRight } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
//import { ProfileContext } from "../context";
import axios from "axios";
import { useRouter } from "next/router";

const editProfile = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [profile, setProfile] = React.useState([]);
	const [place, setPlace] = useState([]);
	//const dataUser = useContext(ProfileContext);
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState();
	const [fullname, setFullname] = useState("");
	const [city, setCity] = useState("");
	const [idPlace, setIdPlace] = useState();
	const [postCode, setPostCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// useEffect(() => {
	// 	localStorage;
	// 	getProfile();
	// 	getPlace();
	// }, [profile?.city]);

	// const getProfile = () => {
	// 	const idUser = dataUser?.id;
	// 	if (idUser) {
	// 		axios
	// 			.get(`https://ticket-byte-v1.herokuapp.com/user/getbyid/${idUser}`)
	// 			.then((res) => {
	// 				setProfile(res?.data[0]);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	}
	// };

	// const getPlace = () => {
	// 	axios
	// 		.get("https://ticket-byte-v1.herokuapp.com/place")
	// 		.then((res) => {
	// 			setPlace(res?.data?.place);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	const handleUpdateProfile = (e) => {
		e.preventDefault();
		console.log("ini dalam function");
		// const body = {
		// 	id: dataUser?.id,
		// 	fullname: fullname,
		// 	email: email,
		// 	phone_number: phoneNumber,
		// 	city: city,
		// 	id_place: address,
		// 	post_code: postCode,
		// };

		axios
			.patch("https://ticket-byte-v1.herokuapp.com/user/edit", {
				id: 1,
				fullname: fullname,
				email: email,
				phone_number: phoneNumber,
				city: city,
				id_place: idPlace,
				post_code: postCode,
			})
			.then((res) => {
				console.log(res);
				// Swal.fire({
				// 	icon: "success",
				// 	text: "Add data recipe successfully",
				// }).then((result) => (result.isConfirmed ? router.push("/") : null));
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	console.log("nama", fullname);
	return (
		<>
			<div className="container">
				<div className={profileStyle.contentEdit}>
					<div className="row justify-content-center">
						<div className="col-md-4">
							<div className="row mt-3">
								<div className="col-3 text-center">{/* <Image src={imgPlane} /> */}</div>
								<div className={`col-6 px-0 ${profileStyle.contentTitle}`}>
									<p>Ankasa</p>
								</div>
								<div className="col-3 text-end">
									<RiAlignRight size={30} />
								</div>
							</div>
							<div className={`row mt-5 mx-2 ${profileStyle.textProfileTop}`}>
								<p>PROFILE</p>
							</div>
							<div className={`row mt-2 mx-2 ${profileStyle.textProfileBtm}`}>
								<p>Profile</p>
							</div>
							<div className={`row mt-5 mx-2 ${profileStyle.textTitleForm}`}>
								<p>Contact</p>
							</div>
							<form onSubmit={handleUpdateProfile}>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label htmlFor="exampleFormControlInput1" className="form-label px-3 mt-4">
										Email
									</label>
									<input
										className="form-control form-control-sm shadow-none py-0 px-3"
										type="email"
										placeholder="email"
										// {profile.email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label htmlFor="exampleFormControlInput1" className="form-label px-3 mt-4">
										Phone Number
									</label>
									<input
										className="form-control form-control-sm shadow-none py-0 px-3"
										type="text"
										// placeholder={profile.phone_number}
										placeholder="phone"
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</div>
								<div className="row mt-3 mx-0">
									<div className={`col-11 px-0 ${profileStyle.textAccount} `}>
										<p>Account Settings</p>
									</div>
									<div className="col-1 px-0 text-end ">
										<IoIosArrowForward color="#2395FF" size={22} />
									</div>
								</div>
								<div className={`row mt-3 mx-2 ${profileStyle.textTitleForm}`}>
									<p>Biodata</p>
								</div>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label htmlFor="exampleFormControlInput1" className="form-label px-3 mt-4">
										Username
									</label>
									<input
										className="form-control form-control-sm py-0 shadow-none px-3"
										type="text"
										// placeholder={profile.fullname}
										placeholder="name"
										onChange={(e) => setFullname(e.target.value)}
									/>
								</div>

								<div className={`px-3 ${profileStyle.formInput}`}>
									<label htmlFor="exampleFormControlInput1" className="form-label px-3 mt-4">
										City
									</label>
									<input
										className="form-control form-control-sm shadow-none py-0 px-3"
										type="text"
										// placeholder={profile.city}
										placeholder="city"
										onChange={(e) => setCity(e.target.value)}
									/>
								</div>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label htmlFor="exampleFormControlInput1" className="form-label px-3 mt-4">
										Address
									</label>
									<select className="form-select shadow-none px-3" id="sel1">
										{/* {place?.map((data) => {
											<option key={data?.id_place}>{data?.city}</option>;
										})} */}
										<option>
											{/* {profile?.id_place}
											 */}
											medan
										</option>
										;
									</select>
								</div>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label htmlFor="exampleFormControlInput1" className="form-label px-3 mt-4">
										Post Code
									</label>
									<input
										className="form-control form-control-sm py-0 shadow-none px-3"
										type="text"
										// placeholder={profile.post_code}
										placeholder="post"
										onChange={(e) => setPostCode(e.target.value)}
									/>
								</div>
								<div className={`d-grid gap-2 my-4 d-md-flex justify-content-end ${profileStyle.btnSave}`}>
									<button className="btn" type="submit" disabled={isLoading}>
										{isLoading ? "Loading..." : "Save"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default editProfile;
