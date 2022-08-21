import React, { useState, useContext, useEffect } from "react";
import profileStyle from "../styles/profile.module.css";
import Image from "next/image";
import imgPlane from "../public/images/plane.png";
import { RiAlignRight } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { ProfileContext } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const editProfile = () => {
	const [profile, setProfile] = useState([]);
	const [place, setPlace] = useState([]);
	const dataUser = useContext(ProfileContext);
	const [titleImage, setTitleImage] = useState("Edit Profile Image");
	const [image, setImage] = useState({});
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState();
	const [fullname, setFullname] = useState("");
	const [city, setCity] = useState("");
	const [idPlace, setIdPlace] = useState();
	const [postCode, setPostCode] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		localStorage;
		getProfile();
		getPlace();
	}, [profile?.city]);

	const getProfile = () => {
		const idUser = dataUser?.id;
		if (idUser) {
			axios
				.get(`https://ticket-byte-v1.herokuapp.com/user/getbyid/${idUser}`)
				.then((res) => {
					setProfile(res?.data[0]);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const getPlace = () => {
		axios
			.get("https://ticket-byte-v1.herokuapp.com/place")
			.then((res) => {
				setPlace(res?.data?.place);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleUpload = (e) => {
		e.preventDefault();
		let uploadedImage = e.target.files[0];
		let nameImage = e.target?.files[0]?.name;
		setTitleImage(nameImage);
		setImage(uploadedImage);
	};
	const handleUploadProfile = (e) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData();
		formData.append("id", dataUser?.id);
		formData.append("photo", image);

		const config = {
			headers: {
				"Content-Type": "multipart/form-data; ",
			},
		};
		axios
			.patch(`https://ticket-byte-v1.herokuapp.com/user/photo`, formData, config)
			.then((res) => {
				Swal.fire({
					icon: "success",
					text: "Edit Profile Success",
				});
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

	const handleUpdateProfile = (e) => {
		e.preventDefault();
		setIsLoading(true);

		axios
			.patch("https://ticket-byte-v1.herokuapp.com/user/edit", {
				id: dataUser?.id,
				fullname: fullname,
				email: email,
				phone_number: phoneNumber,
				city: city,
				id_place: idPlace,
				post_code: postCode,
			})
			.then((res) => {
				Swal.fire({
					icon: "success",
					text: res?.data,
				}).then((result) => (result.isConfirmed ? router.push("/profile") : null));
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
			<div className="container">
				<div className={profileStyle.contentEdit}>
					<div className="row justify-content-center">
						<div className="col-md-4">
							<div className="row mt-3">
								<div className="col-3 text-center">
									<Image src={imgPlane} />
								</div>
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
							<form onSubmit={handleUploadProfile}>
								<div className="row mx-3">
									<input type="file" id="upload" hidden onChange={handleUpload} />
									<label className={profileStyle.labelUpload} for="upload">
										<div className={profileStyle.iconUpload}>
											<MdOutlineAddAPhoto size={20} color="#2395FF" />
											<p>{titleImage}</p>
										</div>
									</label>
								</div>
								<div className={`d-grid gap-2 my-4 px-3 d-md-flex justify-content-end ${profileStyle.btnSave}`}>
									<button className="btn" type="submit" disabled={isLoading}>
										{isLoading ? "Loading..." : "Save"}
									</button>
								</div>
							</form>
							<div className={`row mt-5 mx-2 ${profileStyle.textTitleForm}`}>
								<p>Contact</p>
							</div>
							<form onSubmit={handleUpdateProfile}>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										Email
									</label>
									<input
										className="form-control form-control-sm shadow-none py-0 px-3"
										type="email"
										placeholder={profile?.email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										Phone Number
									</label>
									<input
										className="form-control form-control-sm shadow-none py-0 px-3"
										type="text"
										placeholder={profile?.phone_number}
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
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										Username
									</label>
									<input
										className="form-control form-control-sm py-0 shadow-none px-3"
										type="text"
										placeholder={profile?.fullname}
										onChange={(e) => setFullname(e.target.value)}
									/>
								</div>

								{/* <div className={`px-3 ${profileStyle.formInput}`}>
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										City
									</label>
									<input
										className="form-control form-control-sm shadow-none py-0 px-3"
										type="text"
										placeholder={profile?.city}
										onChange={(e) => setCity(e.target.value)}
									/>
								</div> */}
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										Address
									</label>
									<select className="form-select shadow-none px-3" id="sel1" onChange={(e) => setIdPlace(e.target.value)}>
										{place.map((item, key) => (
											<option key={key} value={item?.id_place}>
												{item?.city}
											</option>
										))}
										;
									</select>
								</div>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										Post Code
									</label>
									<input
										className="form-control form-control-sm py-0 shadow-none px-3"
										type="text"
										placeholder={profile?.post_code}
										onChange={(e) => setPostCode(e.target.value)}
									/>
								</div>
								<div className={`d-grid gap-2 my-4 px-3 d-md-flex justify-content-end ${profileStyle.btnSave}`}>
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
