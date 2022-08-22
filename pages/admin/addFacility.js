import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
// layouts
import Sidebar from "layouts/admin/Sidebar";
// component
import Navbar from "@components/navbar/admin/Navbar";
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";

function addFacility(props) {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get("https://ticket-byte-v1.herokuapp.com/facility").then((res) => setData(res.data.facility));
	}, [data]);

	// state input
	const [class_flight, setClass_flight] = useState("");
	const [facility, setFacility] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleAddFacility = (e) => {
		e.preventDefault();
		setIsLoading(true);

		axios
			.post(`https://ticket-byte-v1.herokuapp.com/facility/add`, {
				class_flight,
				facility,
			})
			.then((res) => {
				// console.log(res);
				Swal.fire({
					icon: "success",
					text: res?.data,
				});
			})
			.catch((err) => {
				console.log(err);
				// Swal.fire({
				// 	icon: "error",
				// 	text: `${err?.response?.data}`,
				// });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div>
			{/* header */}
			<Navbar />
			{/* end header */}
			{/* content */}
			<div className="container-fluid mt-5">
				<div className="row">
					<Sidebar>
						<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
							<div className="pt-3 pb-2 mb-5 border-bottom">
								<h1 className="h2">Add Facility</h1>
							</div>
							{/* form input & table */}
							<div className="row">
								{/* form */}
								<div className="col-4">
									<div className="card p-3 shadow">
										<form onSubmit={handleAddFacility}>
											<div className="row mb-4 mt-2">
												<label htmlFor="inputClass" className="col-3 col-form-label">
													Class
												</label>
												<div className="col-9">
													<input type="text" className="form-control" id="inputClass" onChange={(e) => setClass_flight(e.target.value)} />
												</div>
											</div>
											<div className="row mb-4">
												<label htmlFor="inputFacility" className="col-3 col-form-label">
													Facility
												</label>
												<div className="col-9">
													<input type="text" className="form-control" id="inputFacility" onChange={(e) => setFacility(e.target.value)} />
												</div>
											</div>
											<button type="submit" className="btn btn-primary float-end fw-bold" disabled={isLoading}>
												{isLoading ? "Loading..." : "Add Facility"}
											</button>
										</form>
									</div>
								</div>
								{/* table */}
								<div className="col-8">
									<table className="table table-hover">
										<thead className="table-dark">
											<tr>
												<th>No</th>
												<th>Class</th>
												<th>Facility</th>
											</tr>
										</thead>
										<tbody>
											{data.map((item, index) => (
												<tr key={item?.id_facility}>
													<td>{index + 1}</td>
													<td>{item?.class_flight}</td>
													<td>{item?.facility}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							{/* end form input & table */}
						</main>
					</Sidebar>
				</div>
			</div>
			{/* end content */}
		</div>
	);
}

export default addFacility;

export const getServerSideProps = async ({ req }) => {
	if (hasCookie("token", { req }) && hasCookie("datas", { req })) {
		const user = decryptData(getCookie("datas", { req }));
		if (user.role !== "admin") {
			return {
				redirect: {
					destination: "/register",
					permanent: true,
				},
			};
		}

		return {
			props: {},
		};
	}
	return {
		redirect: {
			destination: "/register",
			permanent: true,
		},
	};
};
