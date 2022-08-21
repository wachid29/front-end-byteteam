/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
// import Link from "next/link";
// import Image from "next/image";

import React, { useState, useContext, useEffect } from "react";

// import profileStyle from "../styles/profile.module.css";
import Swal from "sweetalert2";
// import imgPlane from "../public/images/plane.png";


// persiapan untuk .env domain
// var url = 'https://ticket-byte-v1.herokuapp.com';
var url = 'http://localhost:8000';

const editBooking = () => {
	const [Datas, setDatas] = useState([]);
	const [Update, setUpdate] = useState("");
	const [IdBooking, setIdBooking] = useState();
	// const [place, setPlace] = useState([]);
	// const dataUser = useContext(ProfileContext);
	// const [titleImage, setTitleImage] = useState("Edit Profile Image");
	// const [image, setImage] = useState({});
	// const [email, setEmail] = useState("");
	// const [phoneNumber, setPhoneNumber] = useState();
	// const [fullname, setFullname] = useState("");
	// const [idPlace, setIdPlace] = useState();
	const [isLoading, setIsLoading] = useState(false);
	// const router = useRouter();

	axios
		.get(`${url}/booking/getall`)
		.then((res) => {
			// console.log(res?.data.booking);
			setDatas(res?.data.booking);
		})
		.catch((err) => {
			console.log(err);
		}, []);
	// console.log(profile);

	{/* 
		/booking/statuspaymentforadmin
		id_booking | user_role | status_payment
	*/}
	{/* 
		/booking/statuspaymentcanceled
		id_booking | id_user
	*/}

	const handleStatusPayment = (e) => {
		e.preventDefault();
		setIsLoading(true);

    if (
      Update == "" &&
      Update != "canceled" &&
      Update != "issue" &&
      Update != "boarding"
    ) {
			Swal.fire({
				icon: "error",
				text: `Input "canceled" or "issue" or "boarding" for update status_payment, (id_booking: ${IdBooking})`,
			});
    }

		if(Update == 'canceled'){
			axios
				.patch(`${url}/booking/statuspaymentcanceled`, {
					id_booking: IdBooking,
				}, [])
				.then((res) => {
					Swal.fire({
						icon: "success",
						text: res?.data,
					})
				})
				.catch((err) => {
					console.log(err);
					Swal.fire({
						icon: "error",
						text: `${err?.response?.data}, (id_booking: ${IdBooking})`,
					});
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			axios
				.patch(`${url}/booking/statuspaymentforadmin`, {
					id_booking: IdBooking,
					user_role: "admin",
					status_payment: Update,
				}, [])
				.then((res) => {
					Swal.fire({
						icon: "success",
						text: res?.data,
					})
				})
				.catch((err) => {
					console.log(err);
					Swal.fire({
						icon: "error",
						text: `${err?.response?.data}, (id_booking: ${IdBooking})`,
					});
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	return (
		<>

				{/* 
					jk bisa, buat di localhost:8000, jgn ngebanyakin data deploy utama

					utamakan fungsionalitas:
						edit SP from 'waiting' to 'issue' or 'cancel'
						edit SP from 'issue' to 'boarding'

					user_profile
						"id": 6,
						"fullname": "coba",

					"id_ticket": 10,
					"id_airplane": 2,
            	"name": "Garuda Indonesia",
            	"logo": "https://i.pinimg.com/474x/bd/8a/5e/bd8a5e1921a0afa7bb5f7159ffe29223.jpg"
					"code_airplane": "GA-100",
					"from_date": "2022-08-21T00:00:00.000Z",
					"from_time": "07:05:00",
					"class_flight": "first class",
					"price": 900000,

					new div for guide notes status payment for admin (or for presentation)
					filtering show/hide by checklist waiting, canceled, issue, boarding
					
				*/}


			<h2 className="row justify-content-center py-5" >
				Page for admin to edit payment status by id_booking
			</h2>


			{/* EDIT PAYMENT BOOKING / PAYMENT STATUS */}
			<div className="pb-5">
				<div className="row justify-content-center" >
					<div className="col-md-2">Input Id booking</div>
					<div className="col-md-3">Update payment_status to</div>
					<div className="col-md-2">Confirm</div>
				</div>

				<div className="row justify-content-center" >
					<div className={"col-md-2"}>
						<input
							className=""
							style={{width: "25%"}}
							type="number"
							placeholder=""
							onChange={(e) => (setIdBooking(e.target.value))}
						/>
					</div>
					<div className={"col-md-5"}> 
						<form onSubmit={handleStatusPayment}>
							<div className="row justify-content-center" >
								<div className={"col-md-6"}>
									<input
										className=""
										style={{width: "100%"}}
										type="text"
										placeholder="canceled / issue / boarding"
										onChange={(e) => (setUpdate(e.target.value))}
									/>
								</div>
								<div className={"col-md-6"}>
									<button className="btn" type="submit" disabled={isLoading}>
										{isLoading ? "Loading..." : "Update"}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>


			{/* SHOW ALL PAYMENT BOOKING / PAYMENT STATUS */}
			<div className="row justify-content-center" >
				<div className="col-md-1">Id</div>
				{/* <div className="col-md-2">id_ticket</div>
				<div className="col-md-2">id_user</div>
				<div className="col-md-2">Passenger/s</div>
				<div className="col-md-2">Total Payment</div> */}
				<div className="col-md-1">Status before</div>
			</div>

			{Datas.map((data) => (
				<div 
					key={data.id_booking} 
					className="row justify-content-center"
				>

					<div className="col-md-1">{data?.id_booking}</div>
					{/* <div className="col-md-2">{data.id_ticket}</div>
					<div className="col-md-2">{data.id_user}</div>
					<div className="col-md-2">{data.total_passenger}</div>
					<div className="col-md-2">{data.total_payment}</div> */}
					<div className="col-md-1">{data.status_payment}</div>
					
				</div>

			))}

		</>
	);
};

export default editBooking;
