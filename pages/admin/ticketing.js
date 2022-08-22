import axios from "axios";
import React, { useState } from "react";
// component
import Navbar from "@components/navbar/admin/Navbar";
// layout
import Sidebar from "layouts/admin/Sidebar";
import Swal from "sweetalert2";
// import ticketingStyle from "../../styles/ticketing.module.css";
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";

function Ticketing(props) {
	const [id_airplane, setId_airplane] = useState("");
	const [code_airplane, setCode_airplane] = useState("");
	const [id_from_place, setId_from_place] = useState("");
	const [from_date, setFrom_date] = useState("");
	const [from_time, setFrom_time] = useState("");
	const [from_gate, setFrom_gate] = useState("");
	const [from_terminal, setFrom_terminal] = useState("");
	const [id_to_place, setId_to_place] = useState("");
	const [to_date, setTo_date] = useState("");
	const [to_time, setTo_time] = useState("");
	const [class_flight, setClass_flight] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState("");
	const [isSucces, setisSucces] = React.useState(false);
	const [succesMsg, setSuccesMsg] = React.useState("");
	const [ticket, setTicket] = React.useState([]);

	React.useEffect(() => {
		axios
			.get(`https://ticket-byte-v1.herokuapp.com/ticket`)
			.then((res) => {
				setTicket(res?.data?.ticket);
			})
			.catch((error) => {
				setErrorMsg(error?.response?.data);
				console.log(error?.response?.data);
			});
	}, [ticket]);

	const handleAddTicket = (e) => {
		e.preventDefault();
		setIsLoading(true);
		axios
			.post(`https://ticket-byte-v1.herokuapp.com/ticket/add`, {
				id_airplane,
				code_airplane,
				id_from_place,
				from_date,
				from_time,
				from_gate,
				from_terminal,
				id_to_place,
				to_date,
				to_time,
				class_flight,
				price,
				stock,
			})
			.then((res) => {
				Swal.fire({
					icon: "success",
					text: res?.data,
				});
			})
			.catch((err) => {
				// setIsLoading(false);
				// setIsError(true);
				// setisSucces(false);
				// setErrorMsg(err?.response?.data);
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<>
			<Navbar />
			{/* content */}
			<div className="container-fluid mt-5">
				<div className="row">
					<Sidebar>
						<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
							<div className="pt-3 pb-2 mb-5 border-bottom">
								<h1 className="h2">Add Ticket</h1>
							</div>
							{/* form input */}
							<form className="row g-3" onSubmit={handleAddTicket}>
								{/* {isError ? (
								<>
									<script type="text/javascript">
										setTimeout(function ()
										{
											// Closing the alert
											alert(errorMsg)
										}
										; &rbrace;, 5000);
									</script>
								</>
							) : null} */}
								{/* {isSucces ? (
									<div className="alert alert-success alert-dismissible fade show" role="alert">
										<strong>{succesMsg}</strong>
										<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>
								) : null} */}
								<div className="card mt-4 p-5 shadow">
									<div className="row">
										<div className="col-6">
											<div className="mb-1 pt-4 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													ID Airplane
												</label>
												<div className="col-9">
													<input
														type="number"
														className="form-control"
														id="inputtext"
														placeholder="1-6"
														onChange={(e) => setId_airplane(e.target.value)}
													/>
												</div>
											</div>
										</div>
										{/* input code_airplane*/}
										<div className="col-6">
											<div className="mb-1 pt-4 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													Code Airplane
												</label>
												<div className="col-9">
													<input
														type="text"
														className="form-control"
														id="inputtext"
														placeholder="GA-100"
														onChange={(e) => setCode_airplane(e.target.value)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-6">
											{/* input id_from_place*/}
											<div className="mb-1 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													ID From Place
												</label>
												<div className="col-9">
													<input
														type="number"
														className="form-control"
														id="inputtext"
														placeholder="1-21 except:3"
														onChange={(e) => setId_from_place(e.target.value)}
													/>
												</div>
											</div>
										</div>
										<div className="col-6">
											{/* input from_date*/}
											<div className="mb-1 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													Form Date
												</label>
												<div className="col-9">
													<input
														type="text"
														className="form-control"
														id="inputtext"
														placeholder="YYYY-MM-DD"
														onChange={(e) => setFrom_date(e.target.value)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-6">
											{/* input from_time*/}
											<div className="mb-1 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													Form Time
												</label>
												<div className="col-9">
													<input
														type="text"
														className="form-control"
														id="inputtext"
														placeholder="HH:MM:SS"
														onChange={(e) => setFrom_time(e.target.value)}
													/>
												</div>
											</div>
										</div>
										<div className="col-6">
											{/* input from_gate*/}
											<div className="mb-1 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													From Gate
												</label>
												<div className="col-9">
													<input
														type="number"
														className="form-control"
														id="inputtext"
														placeholder="1-20"
														onChange={(e) => setFrom_gate(e.target.value)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-6">
											{/* input from_terminal*/}
											<div className="mb-1 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													From Terminal
												</label>
												<div className="col-9">
													<input
														type="text"
														className="form-control"
														id="inputtext"
														placeholder="A-D"
														onChange={(e) => setFrom_terminal(e.target.value)}
													/>
												</div>
											</div>
										</div>
										<div className="col-6">
											{/* input id_to_place */}
											<div className="mb-1 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													ID To Place
												</label>
												<div className="col-9">
													<input
														type="number"
														className="form-control"
														id="inputtext"
														placeholder="1-21"
														onChange={(e) => setId_to_place(e.target.value)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-6">
											{/* input to_date*/}
											<div className="mb-1 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													To Date
												</label>
												<div className="col-9">
													<input
														type="text"
														className="form-control"
														id="inputtext"
														placeholder="YYYY-MM-DD"
														onChange={(e) => setTo_date(e.target.value)}
													/>
												</div>
											</div>
										</div>
										<div className="col-6">
											{/* input to_time*/}
											<div className="mb-1 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													To Time
												</label>
												<div className="col-9">
													<input
														type="text"
														className="form-control"
														id="inputtext"
														placeholder="HH:MM:SS"
														onChange={(e) => setTo_time(e.target.value)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-4">
											{/* input class_flight*/}
											<div className="mb-1 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													Class Flight
												</label>
												<div className="col-9">
													<input
														type="text"
														className="form-control"
														id="inputtext"
														placeholder="Economy/Business/First Flight"
														onChange={(e) => setClass_flight(e.target.value)}
													/>
												</div>
											</div>
										</div>
										<div className="col-4">
											{/* input price*/}
											<div className="mb-1 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													Price
												</label>
												<div className="col-9">
													<input
														type="number"
														className="form-control"
														id="inputtext"
														placeholder="xxxxxxx"
														onChange={(e) => setPrice(e.target.value)}
													/>
												</div>
											</div>
										</div>
										<div className="col-4">
											{/* input stock*/}
											<div className="mb-4 pt-3 row">
												<label htmlFor="inputtext" className="col-3 col-form-label">
													Stock
												</label>
												<div className="col-9">
													<input
														type="number"
														className="form-control"
														id="inputtext"
														placeholder="1-100"
														onChange={(e) => setStock(e.target.value)}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="col-12">
										<button type="submit" className="btn btn-primary float-end" disabled={isLoading}>
											{isLoading ? "Loading..." : "Add Ticket"}
										</button>
									</div>
								</div>
							</form>
							{/* Table */}
							<h2 className="mt-5 border-bottom">Data Ticket</h2>

							<table className="table table-hover mt-5">
								<thead className="table-dark">
									<tr className="text-center">
										<th scope="col">NO</th>
										<th>Id Ticket</th>
										<th scope="col">Code Airplane</th>
										<th scope="col"> Date </th>
										<th scope="col">Airplane</th>
										<th scope="col">Departure</th>
										<th scope="col">Arrival</th>
										<th scope="col">Class Flight</th>
									</tr>
								</thead>
								<tbody>
									{ticket?.map((item, index) => (
										<tr key={index}>
											<th scope="row">{index + 1}</th>
											<th>{item.id_ticket}</th>
											<td>{item?.code_airplane}</td>
											<td>{item?.from_date}</td>
											<td>{item?.name}</td>
											<td>{item?.place1[0]?.city}</td>
											<td>{item?.place2[0]?.city}</td>
											<td>{item?.class_flight}</td>
										</tr>
									))}
								</tbody>
							</table>
						</main>
					</Sidebar>
				</div>
			</div>
			{/* end content */}
		</>
	);
}

export default Ticketing;

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
