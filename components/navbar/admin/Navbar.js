import React from "react";
import Link from "next/link";
// css
import styles from "../../../styles/admin/dashboard.module.css";

function Navbar() {
	return (
		<div>
			{/* header */}
			<header className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
				<Link href="#" passHref>
					<a className={`navbar-brand col-md-3 col-lg-2 me-0 px-3 ${styles.navbar_brand}`}>Company name</a>
				</Link>
				<button
					className={`navbar-toggler position-absolute d-md-none collapsed  ${styles.navbar_toggler}`}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#sidebarMenu"
					aria-controls="sidebarMenu"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<input className={`form-control form-control-dark w-100 ${styles.form_control_dark}`} type="text" placeholder="Search" aria-label="Search" />
				<div className="navbar-nav">
					<div className="nav-item text-nowrap">
						<a className="nav-link px-3" href="#">
							Sign out
						</a>
					</div>
				</div>
			</header>
			{/* end header */}
		</div>
	);
}

export default Navbar;
