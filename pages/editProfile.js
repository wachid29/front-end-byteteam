import React from "react";
import profileStyle from "../styles/profile.module.css";
import Image from "next/image";
import imgPlane from "../public/images/plane.png";
import { RiAlignRight } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

const editProfile = () => {
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
							<div className={`row mt-5 mx-2 ${profileStyle.textTitleForm}`}>
								<p>Contact</p>
							</div>
							<form>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										Email
									</label>
									<input className="form-control form-control-sm py-0 px-3" type="email" placeholder="flightbooking@angkasa.com" />
								</div>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										Phone Number
									</label>
									<input className="form-control form-control-sm py-0 px-3" type="text" placeholder="+6281987654321" />
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
									<input className="form-control form-control-sm py-0 px-3" type="text" placeholder="Mike Kowalski" />
								</div>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										City
									</label>
									<select className="form-select px-3" id="sel1">
										<option>Medan</option>
										<option>Tangerang</option>
										<option>Bogor</option>
										<option>Jakarta</option>
									</select>
								</div>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										Address
									</label>
									<input className="form-control form-control-sm py-0 px-3" type="text" placeholder="Medan, Indonesia" />
								</div>
								<div className={`px-3 ${profileStyle.formInput}`}>
									<label for="exampleFormControlInput1" className="form-label px-3 mt-4">
										Post Code
									</label>
									<input className="form-control form-control-sm py-0 px-3" type="text" placeholder="55555" />
								</div>
								<div className={`d-grid gap-2 my-4 d-md-flex justify-content-end ${profileStyle.btnSave}`}>
									<button className="btn" type="button">
										Save
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
