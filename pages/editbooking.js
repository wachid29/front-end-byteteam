/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";
// import Link from "next/link";
// import Image from "next/image";

import React, { useState, useContext, useEffect } from "react";

import Swal from "sweetalert2";
// import profileStyle from "../styles/profile.module.css";
// import imgPlane from "../public/images/plane.png";

// PERSIAPAN UNTUK ENV DOMAIN
var url = 'https://ticket-byte-v1.herokuapp.com';
// var url = 'http://localhost:8000';

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
			setDatas(res?.data.booking);
		})
		.catch((err) => {
			console.log(err);
		}, []);
	const handleStatusPayment = (e) => {
		e.preventDefault();
		setIsLoading(true);

    if ( Update == "" && Update != "canceled" && Update != "issue" && Update != "boarding" ) {
			Swal.fire({
				icon: "error",
				text: `Input "canceled" or "issue" or "boarding" for update status_payment, (id_booking: ${IdBooking})`,
			});
    }

		if (Update == 'canceled'){
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
			{/* TITLE */}
			<h2 className="row justify-content-center py-5" > Page for admin to edit payment status by id_booking </h2>

			{/* MAIN - LEFT FOR EDITING FORM | RIGHT FOR SHOW ALL BOOKING STATUS_PAYMENT  */}
			<div className="row justify-content-center" >

				{/* SHOW ALL PAYMENT BOOKING / PAYMENT STATUS */}
				<div className="col-md-8">
					{/* TITLE TABLE SHOW ALL */}
					<div className="row justify-content-center pb-2" >
						<div className="col-md-1">Id</div>
						<div className="col-md-1">id_ticket</div>
						<div className="col-md-1">id_user</div>
						<div className="col-md-2">Passenger/s</div>
						<div className="col-md-2">Total Payment</div>
						<div className="col-md-2">Status before</div>
					</div>
					{/* MAPPING DATA ALL BOOKING */}
					{Datas.map((data) => (
						<div key={data.id_booking} className="row justify-content-center pb-1" >
							<div className="col-md-1">{data?.id_booking}</div>
							<div className="col-md-1">{data.id_ticket}</div>
							<div className="col-md-1">{data.id_user}</div>
							<div className="col-md-2">{data.total_passenger}</div>
							<div className="col-md-2">{data.total_payment}</div>
							<div className="col-md-2">{data.status_payment}</div>		
						</div>
					))}
				</div>
					
			{/* 
				HELP:
				1 UI DESAIN
				2 (USE STATE) AMBIL VARIABEL DARI DARI MAPPING DATA, DAN AXIOS KEMBALI UNTUK USER_PROFILE, ID_TICKET, ID_AIRPLANE
				3 FILTERING? CHECKLIST UNTUK SHOW/HIDE: WAITING / CANCELED / ISSUE / BOARDING

				RENCANA DATA YANG INGIN DIKEMBALIKAN:
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
			*/}

				{/* FORM EDITING */}
				<div className="col-md-4">
					<div className="row justify-content-center" >
						<div className="col-md-8">
						
							{/* PETUNJUK */}
							<div className="">Can change status_payment:</div>
							<div className="">-from `waiting` to  `issue` or `canceled`</div>
							<div className="">-from `issue` to  `issue` or `boarding`</div>

							<form onSubmit={handleStatusPayment}>

								<div className="pt-5">Input Id booking</div>
								<input
									className=""
									style={{width: "25%"}}
									type="number"
									onChange={(e) => (setIdBooking(e.target.value))}
								/>
								<div className="pt-3">Update status_payment to</div>
								<input
									className=""
									style={{width: "100%"}}
									type="text"
									placeholder="canceled / issue / boarding"
									onChange={(e) => (setUpdate(e.target.value))}
								/>
								<button className="mt-3 btn" type="submit" disabled={isLoading}>
									{isLoading ? "Loading..." : "UPDATE"}
								</button>

							</form>
						</div>
					</div>
				</div>

			</div>
		</>
	);
};

export default editBooking;
