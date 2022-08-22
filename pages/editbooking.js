/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";
// import Link from "next/link";
// import Image from "next/image";

import React, { useState, useContext, useEffect } from "react";

import Swal from "sweetalert2";
// import profileStyle from "../styles/profile.module.css";
// import imgPlane from "../public/images/plane.png";

// PERSIAPAN UNTUK ENV DOMAIN
// var url = 'https://ticket-byte-v1.herokuapp.com';
var url = 'http://localhost:8000';

const editBooking = () => {
	const [Datas, setDatas] = useState([]);
	const [Update, setUpdate] = useState("");
	const [IdBooking, setIdBooking] = useState();
	const [isLoading, setIsLoading] = useState(false);

	axios
		.get(`${url}/booking/getall`)
		.then((res) => {
			setDatas(res?.data.booking)
		}, [])
		.catch((err) => {
			console.log(err);
		}, []);
		
	// console.log(data)

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

			{/* MAIN - RIGHT FOR EDITING FORM | LEFT FOR SHOW ALL BOOKING STATUS_PAYMENT  */}
			<div className="row justify-content-center" >

				{/* SHOW ALL PAYMENT BOOKING / PAYMENT STATUS */}
				<div className="col-md-8">
					<div className="row justify-content-center" >
						<div className="col-md-10">
						
							{Datas.map((data) => (
								<div key={data?.id_booking} className="row justify-content-center pb-2" >
									<div className="col-md-1 pt-2"> {data?.id_booking} </div>
									<div className="col-md-8">
										<div className="row justify-content-center" >
											<div className="col-md-4">(id:{data?.id_user}) {data?.username}</div>
											<div className="col-md-4">{data.total_passenger} Passenger(s)</div>
											<div className="col-md-4">Total Payment: {data.total_payment}</div>
										</div>
										<div className="row justify-content-center" >
											<div className="col-md-4" >
												{/* <img 
													src={data?.logo} 
													width={"40px"}
													style={{borderRadius:"50%"}}
													alt="image-airlines"
												/> */}
												{data.name}
											</div>
											<div className="col-md-4">{data.class_flight}</div>
											<div className="col-md-4">Departure: {data.from_date}</div>
										</div>
									</div>
									<div className="col-md-3 pt-2">
										{data.status_payment}
									</div>
								</div>
							))}

						</div>
					</div>
				</div>
					
				{/* FORM EDITING */}
				<div className="col-md-4">
					<div className="row justify-content-center" >
						<div className="col-md-10">
						
							{/* PETUNJUK */}
							<div className="">Change status_payment:</div>
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
