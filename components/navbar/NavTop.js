import React from "react";
import Link from "next/link";
// icon
import { FaRegEnvelope, FaRegBell } from "react-icons/fa";

export default function NavTop() {
	return (
		<div>
			{/* <nav className="navbar navbar-dark bg-warning navbar-expand d-md-none d-lg-none d-xl-none fixed-bottom"> */}
			<nav className="navbar navbar-light bg-white navbar-expand d-flex justify-content-between fixed-top py-3 px-2">
				<h1>Explore</h1>
				<ul className="navbar-nav nav-justified w-30 p-0 m-0">
					{/* Message */}
					<li className="nav-item">
						<Link href="/message" passHref>
							<a className="nav-link text-muted">
								<FaRegEnvelope size="1.5rem" />
							</a>
						</Link>
					</li>
					{/* Notification */}
					<li className="nav-item">
						<Link href="/notification" passHref>
							<a className="nav-link text-muted">
								<FaRegBell size="1.5rem" />
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
