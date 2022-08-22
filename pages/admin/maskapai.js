import React, { useState, useEffect } from "react";
// import maskapaiStyle from "../../styles/pages/maskapai.module.css";
import axios from "axios";
import Swal from "sweetalert2";
// layout
import Sidebar from "layouts/admin/Sidebar";
// component
import Navbar from "@components/navbar/admin/Navbar";
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";

const maskapai = (props) => {
	const [name, setName] = useState("");
	const [logo, setLogo] = useState("");
	const [airline, setAirline] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		axios
			.get("https://ticket-byte-v1.herokuapp.com/maskapai")
			.then((res) => {
				console.log(res?.data?.maskapai);
				setAirline(res?.data?.maskapai);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleAddMaskapai = (e) => {
		e.preventDefault();
		setIsLoading(true);

		axios
			.post(`https://ticket-byte-v1.herokuapp.com/maskapai/add`, {
				name,
				logo,
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
		<>
			<div>
				<Navbar />
				<div className="container-fluid mt-5">
					<div className="row">
						<Sidebar>
							<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
								<div className="pt-3 pb-2 mb-5 border-bottom">
									<h1 className="h2">Add Maskapai</h1>
								</div>
								<div className=" row">
									{/* form */}
									<div className="col-3">
										<div className="card p-3 shadow">
											<form onSubmit={handleAddMaskapai}>
												<div className="mb-3">
													<label htmlFor="exampleInputEmail1" className="form-label">
														Airline Name
													</label>
													<input
														type="text"
														className="form-control shadow-none"
														placeholder="Airline Name"
														onChange={(e) => setName(e.target.value)}
													/>
												</div>
												<div className="mb-3">
													<label htmlFor="formFile" className="form-label">
														Airline Logo
													</label>
													<input
														type="text"
														className="form-control shadow-none"
														placeholder="Airline Logo"
														onChange={(e) => setLogo(e.target.value)}
													/>
												</div>
												<div className={`d-grid gap-2 my-4  d-md-flex justify-content-end`}>
													<button className="btn btn-primary shadow-none" type="submit" disabled={isLoading}>
														{isLoading ? "Loading..." : "Add Maskapai"}
													</button>
												</div>
											</form>
										</div>
									</div>
									{/* table */}
									<div className="col-9">
										<table className="table table-hover">
											<thead className="table-dark">
												<tr>
													<th scope="col">No</th>
													<th scope="col">ID Maskapai</th>
													<th scope="col">Maskapai</th>
												</tr>
											</thead>
											<tbody>
												{airline?.map((item, index) => (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{item?.id_maskapai}</td>
														<td>{item?.name}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</main>
						</Sidebar>
					</div>
				</div>
			</div>
		</>
	);
};

export default maskapai;

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
