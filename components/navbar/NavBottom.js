import React from "react";
import Link from "next/link";
// icon
import { FaRegCalendarAlt, FaUserCircle, FaCompass } from "react-icons/fa";
// css
import styles from "../../styles/Home.module.css";

function NavBottom() {
	return (
		<div>
			{/* <nav className="navbar navbar-dark bg-warning navbar-expand d-md-none d-lg-none d-xl-none fixed-bottom"> */}
			<nav className="navbar navbar-light bg-light navbar-expand fixed-bottom shadow-lg px-0 py-3">
				<ul className="navbar-nav nav-justified w-100 p-0 m-0">
					{/* My Booking */}
					<li className="nav-item mx-2">
						<Link href="/myBooking" passHref>
							<a className="nav-link text-muted">
								<FaRegCalendarAlt size="2rem" className="mb-2" />
								<br />
								My Booking
							</a>
						</Link>
					</li>
					{/* Destination */}
					<li className="nav-item">
						<Link href="/destination/searchFlight" passHref>
							<a className="nav-link text-primary">
								<FaCompass size="4rem" className={styles.d_icon} />
							</a>
						</Link>
					</li>
					{/* Profile */}
					<li className="nav-item mx-2">
						<Link href="/profile" passHref>
							<a className="nav-link text-muted">
								<FaUserCircle size="2rem" className="mb-2" />
								<br />
								Profile
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default NavBottom;
