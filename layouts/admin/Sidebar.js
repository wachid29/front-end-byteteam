import React from "react";
import Link from "next/link";
// icon
import { BsHouseFill, BsGearFill } from "react-icons/bs";
import { FaWarehouse, FaPlaneDeparture, FaTicketAlt, FaMap } from "react-icons/fa";
// css
import styles from "../../styles/admin/dashboard.module.css";

function Sidebar(props) {
	return (
		<div className="w-100 h-100">
			<div className="w-100 h-100">{props.children}</div>
			<nav id="sidebarMenu" className={`col-md-3 col-lg-2 d-md-block bg-light collapse ${styles.sidebar}`}>
				<div className="position-sticky pt-3">
					<ul className="nav flex-column">
						<li className="nav-item mb-2">
							<Link href="/admin" passHref>
								<a className={`nav-link text-primary ${styles.active}`} aria-current="page">
									<BsHouseFill size="1.5rem" className={`text-primary ${styles.d_icon}`} />
									<small>Dashboard</small>
								</a>
							</Link>
						</li>
						<li className="nav-item mb-2">
							<Link href="/admin/addFacility" passHref>
								<a className="nav-link active" aria-current="page">
									<FaWarehouse size="1.5rem" className={styles.d_icon} />
									<small>Facility</small>
								</a>
							</Link>
						</li>
						<li className="nav-item mb-2">
							<Link href="/admin/maskapai" passHref>
								<a className="nav-link active" aria-current="page">
									<FaPlaneDeparture size="1.5rem" className={styles.d_icon} />
									<small>Maskapai</small>
								</a>
							</Link>
						</li>
						<li className="nav-item mb-2">
							<Link href="/admin/ticketing" passHref>
								<a className="nav-link active" aria-current="page">
									<FaTicketAlt size="1.5rem" className={styles.d_icon} />
									<small>Ticket</small>
								</a>
							</Link>
						</li>
						<li className="nav-item mb-2">
							<Link href="/admin/place" passHref>
								<a className="nav-link active" aria-current="page">
									<FaMap size="1.5rem" className={styles.d_icon} />
									<small>Place</small>
								</a>
							</Link>
						</li>
						<li className="nav-item mb-2">
							<Link href="/admin/editBooking" passHref>
								<a className="nav-link active" aria-current="page">
									<BsGearFill size="1.5rem" className={styles.d_icon} />
									<small>Edit Booking</small>
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}

export default Sidebar;
