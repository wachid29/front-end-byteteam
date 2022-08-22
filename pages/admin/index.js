import React from "react";
import Link from "next/link";
// layouts
import Sidebar from "layouts/admin/Sidebar";
// component
import Navbar from "@components/navbar/admin/Navbar";
// icon
import { BsHouseFill, BsPeople } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
// css
import styles from "../../styles/admin/dashboard.module.css";
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";

function dashboard(props) {
	return (
		<div>
			{/* header */}
			<Navbar />
			{/* end header */}

			{/* content */}
			<div className="container-fluid mt-5">
				<div className="row">
					{/* sidebar */}
					<Sidebar>
						<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
							<div className="pt-3 pb-2 mb-3 border-bottom">
								<h1 className="h2">Dashboard</h1>
							</div>
							<h3 className="mt-5">All Data</h3>
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">Header</th>
											<th scope="col">Header</th>
											<th scope="col">Header</th>
											<th scope="col">Header</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1,001</td>
											<td>random</td>
											<td>data</td>
											<td>placeholder</td>
											<td>text</td>
										</tr>
										<tr>
											<td>1,002</td>
											<td>placeholder</td>
											<td>irrelevant</td>
											<td>visual</td>
											<td>layout</td>
										</tr>
										<tr>
											<td>1,003</td>
											<td>data</td>
											<td>rich</td>
											<td>dashboard</td>
											<td>tabular</td>
										</tr>
									</tbody>
								</table>
							</div>
						</main>
					</Sidebar>
				</div>
			</div>
			{/* end content */}
		</div>
	);
}

export default dashboard;

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
