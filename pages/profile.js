import React, { useState, useEffect, useContext } from "react";
import profileStyle from "../styles/profile.module.css";
import Link from "next/link";
import { MdSettings, MdLogout, MdArrowForwardIos } from "react-icons/md";
import { BsFillStarFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
import { ProfileContext } from "../context";

function Profile() {
	const [profile, setProfile] = useState([]);
	const dataUser = useContext(ProfileContext);
	const router = useRouter();

	useEffect(() => {
		localStorage;
		getProfile();
	}, []);

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

	const handleLogout = () => {
		localStorage.clear();
		Swal.fire({
			icon: "success",
			text: "You have logged out",
		}).then((result) => (result.isConfirmed ? router.push("/") : null));
	};

	return (
		<>
			<section>
				<div className={profileStyle.main}>
					<div className="d-flex justify-content-between align-items-center mt-4 mb-5">
						<h2>Profile</h2>
						<Link href="/editProfile" passHref>
							<a>Edit</a>
						</Link>
					</div>

					<div className="d-flex justify-content-center text-center">
						<div className="card mb-3" style={{ borderRadius: "50%", borderColor: "#2395FF", borderWidth: "5px" }}>
							<img
								src={profile?.photo}
								className="card-img-bottom"
								alt="photo profile"
								width="100px"
								height="180px"
								style={{ borderRadius: "50%", padding: "10px" }}
							/>
						</div>
					</div>
					<div className="text-center">
						<h4>{profile?.fullname}</h4>
						<p>
							{profile?.city} <span>{profile?.country}</span>
						</p>
					</div>

					<div className="d-flex justify-content-between align-items-center mt-4 mb-1">
						<h6>Card</h6>
						<a>+ Add</a>
					</div>
					<div
						className="card text-bg-primary mb-4"
						style={{ maxWidth: "18rem", borderRadius: "10px", boxShadow: "0px 8px 25px rgba(35, 149, 255, 0.49)" }}>
						<div className="card-body">
							<h6 className="card-title">4441 1235 5512 5551</h6>
							<div className="d-flex justify-content-between">
								<p className="card-text">X Card</p>
								<p className="card-text">$ 1,440.2</p>
							</div>
						</div>
					</div>
					<div style={{ boxShadow: " 0px 3px 12px 0px rgba(0,0,0,0.39)", borderRadius: "10px" }}>
						<div className="card " style={{ padding: "15px" }}>
							<div className="row mb-2">
								<span className="col-2 ">
									<BsFillStarFill style={{ color: "#979797" }} />
								</span>
								<h6 className="col-4 pt-1">My Review</h6>
								<div className="col-6 d-flex justify-content-end">
									<MdArrowForwardIos style={{ color: "#979797" }} />
								</div>
							</div>
							<div className="row mb-2">
								<span className="col-2">
									<MdSettings style={{ color: "#979797" }} />
								</span>
								<h6 className="col-4 pt-1">Settings</h6>
								<div className="col-6 d-flex justify-content-end">
									<MdArrowForwardIos style={{ color: "#979797" }} />
								</div>
							</div>
							<div className="row mb-2">
								<span className="col-2">
									<MdLogout style={{ color: "#F24545" }} />
								</span>
								<h6 className="col-4 pt-1" style={{ color: "#F24545" }}>
									LogOut
								</h6>
								<div className="col-6 d-flex justify-content-end">
									<a style={{ color: "#F24545", cursor: "pointer" }}>
										<MdArrowForwardIos onClick={handleLogout} />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				;
			</section>
		</>
	);
}

export default Profile;
