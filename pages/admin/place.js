import React, { useState, useEffect } from "react";
// import maskapaiStyle from "../../styles/pages/maskapai.module.css";
// layouts
import Sidebar from "layouts/admin/Sidebar";
// component
import Navbar from "@components/navbar/admin/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";

const place = (props) => {
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [cityCode, setCityCode] = useState("");
	const [cityPicture, setCityPicture] = useState("");
	const [placeAll, setPlaceAll] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		axios
			.get(`https://ticket-byte-v1.herokuapp.com/place-fix`)
			.then((res) => {
				// console.log(res?.data?.place);
				setPlaceAll(res?.data?.place);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [placeAll]);

	const handleAddPlace = (e) => {
		e.preventDefault();
		setIsLoading(true);

		axios
			.post(`https://ticket-byte-v1.herokuapp.com/place/add`, {
				city,
				country,
				city_code: cityCode,
				city_picture: cityPicture,
			})
			.then((res) => {
				// console.log(res);
				Swal.fire({
					icon: "success",
					text: res?.data,
				});
			})
			.catch((err) => {
				// console.log(err);
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
			<Navbar />
			<div className="container-fluid mt-5">
				<div className="row">
					<Sidebar>
						<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
							<div className="pt-3 pb-2 mb-5 border-bottom">
								<h1 className="h2">Add Place</h1>
							</div>
							{/* contetent */}
							<div className="row">
								<div className="col-4">
									<div className="card p-4 shadow">
										<form onSubmit={handleAddPlace}>
											<div className="mb-3">
												<label htmlFor="exampleInputEmail1" className="form-label">
													City
												</label>
												<input type="text" className="form-control shadow-none" placeholder="City" onChange={(e) => setCity(e.target.value)} />
											</div>
											<div className="mb-3">
												<label htmlFor="formFile" className="form-label">
													Country
												</label>
												<input type="text" className="form-control shadow-none" placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
											</div>
											<div className="mb-3">
												<label htmlFor="formFile" className="form-label">
													City Code
												</label>
												<input
													type="text"
													className="form-control shadow-none"
													placeholder="City Code"
													onChange={(e) => setCityCode(e.target.value)}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="formFile" className="form-label">
													City Picture
												</label>
												<input
													type="text"
													className="form-control shadow-none"
													placeholder="City Picture"
													onChange={(e) => setCityPicture(e.target.value)}
												/>
											</div>
											<div className={`d-grid gap-2 my-4  d-md-flex justify-content-end`}>
												<button className="btn btn-primary shadow-none" type="submit" disabled={isLoading}>
													{isLoading ? "Loading..." : "Add"}
												</button>
											</div>
										</form>
									</div>
								</div>
								{/* table */}
								<div className="col-8">
									<table className="table table-bordered table-striped-columns table-hover">
										<thead className="table-primary">
											<tr className="text-center">
												<th scope="col">No</th>
												<th scope="col">ID Place</th>
												<th scope="col">City</th>
												<th scope="col">Country</th>
												<th scope="col">Code</th>
												{/* <th scope="col">City Picture</th> */}
											</tr>
										</thead>
										<tbody>
											{placeAll?.map((item, index) => (
												<tr key={index}>
													<td className="text-center">{index + 1}</td>
													<td className="text-center">{item?.id_place}</td>
													<td className="text-center">{item?.city}</td>
													<td className="text-center">{item?.country}</td>
													<td className="text-center">{item?.city_code}</td>
													{/* <td>{item?.city_picture}</td> */}
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
		</>
	);
};

export default place;

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
