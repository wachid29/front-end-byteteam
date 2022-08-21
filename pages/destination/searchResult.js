import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
// icon
import { FaChevronLeft, FaPlaneDeparture } from "react-icons/fa";
import { BsArrowLeftRight, BsArrowDownUp } from "react-icons/bs";
// css
import styles from "../../styles/destinationResult.module.css";
function searchResult() {
	// data query params from search flight
	const router = useRouter();
	const query = router.query;
	const { from, to, date, classFlight, peopleAdult, peopleChild } = query;

	// state find ticket
	const [data, setData] = useState([]);
	const [totalData, setTotalData] = useState(0);
	useEffect(() => {
		axios
			.get(
				`https://ticket-byte-v1.herokuapp.com/ticket/find-ticket?id_from_place=${from}&id_to_place=${to}&from_date=${date}&class_flight=${classFlight}`
			)
			.then((res) => {
				setData(res.data.ticket);
				setTotalData(res.data.jumlahData);
			});
	}, [from, to, date, classFlight]);

	// state place from and to
	const [placeFrom, setPlaceFrom] = useState([]);
	const [placeTo, setPlaceTo] = useState([]);

	useEffect(() => {
		axios.get(`https://ticket-byte-v1.herokuapp.com/place/findbyID?id=${from}`).then((res) => setPlaceFrom(res.data.place));
		axios.get(`https://ticket-byte-v1.herokuapp.com/place/findbyID?id=${to}`).then((res) => setPlaceTo(res.data.place));
	}, [from, to]);

	return (
		<div className={styles.content}>
			<div className={`card bg-primary ${styles.d_header}`}>
				<div className={`pt-4 pb-0 px-3 ${styles.title_header}`}>
					<Link href="/destination/searchFlight" passHref>
						<a className="text-decoration-none text-white fw-bold">
							<FaChevronLeft size="1.5rem" />
						</a>
					</Link>
					<span className="badge fw-bold fs-6 px-3 py-3 float-end">{date}</span>
					<div className={`text-white ${styles.d_title}`}>
						<div className="d-flex justify-content-between w-100">
							<p>From</p>
							<p>To</p>
						</div>
						<div className="d-flex justify-content-between w-100">
							<h4>{placeFrom[0]?.city}</h4>
							<h4>
								<BsArrowLeftRight size="1.5rem" />
							</h4>
							<h4>{placeTo[0]?.city}</h4>
						</div>
						<div className="d-flex justify-content-between w-100">
							{/* from */}
							<p>{placeFrom[0]?.country}</p>
							{/* to */}
							<p>{placeFrom[0]?.country}</p>
						</div>
					</div>
				</div>
				<Image src="/images/bg_result.svg" layout="fill" objectFit="cover" />
			</div>
			{/* passenger class */}
			<div className={`bg-light px-3 py-5 ${styles.d_passengerClass}`}>
				<div className="row">
					<div className="col-6">
						<p className="text-center text-muted">Passenger</p>
					</div>
					<div className="col-6">
						<p className="text-center text-muted">Class</p>
					</div>
				</div>

				<div className="row">
					<div className="col-8 p-0">
						{/* passenger result */}
						<p className="text-center fs-5">{`${peopleChild} Child | ${peopleAdult} Adult`}</p>
					</div>
					<div className="col-4">
						{/* class result */}
						<p className="text-start fs-5">{classFlight}</p>
					</div>
				</div>
			</div>
			{/* result content */}
			<main className="container pb-5">
				<div className="row mt-5 mb-2">
					<div className="col-6">
						<p className="text-muted text-start ms-3 fw-bold mt-2">{`${totalData} flight found`}</p>
					</div>
					<div className="col-6 text-end">
						<button type="button" className="btn me-3">
							Filter <BsArrowDownUp className="ms-2" />
						</button>
					</div>
				</div>
				{/* card */}
				{data.map((item) => (
					<Link
						href={{
							pathname: "/detailDestination/",
							query: { id_ticket: item?.id_ticket, peopleChild: peopleChild, peopleAdult: peopleAdult },
						}}>
						<div
							key={item?.id_ticket}
							className={`card mb-2 border-top-0 border-start-0 border-end-0 border border-bottom-4 ${styles.d_card}`}>
							<div className="row">
								<div className="col-8">
									<div className="d-flex justify-content-around">
										<h1>{item?.place1[0]?.city_code}</h1>
										<FaPlaneDeparture size="1.5rem" className="text-muted mt-2" />
										<h1>{item?.place2[0]?.city_code}</h1>
									</div>
									<div>
										<small className="ms-4 text-muted">{item?.from_time}</small>
										<small className="float-end me-4 mt-1 text-muted">{item?.to_time}</small>
									</div>
									<p className="ms-3 mt-3 text-muted fs-5">{item?.name}</p>
								</div>
								<div className="col-4">
									<p className="ms-2 mt-2 text-muted lh-1">
										Terminal <b className="text-dark">{item?.from_terminal}</b>
									</p>
									<p className="text-center text-muted lh-sm">
										Gate <b className="ms-3 text-dark">{item?.from_gate}</b>
									</p>
									<p className="text-primary fs-5 ms-2 mt-4 lh-sm fw-bold">
										<small>{`RP.${item?.price}`}</small>
									</p>
								</div>
							</div>
						</div>
					</Link>
				))}
				{/* end card */}
			</main>
		</div>
	);
}

export default searchResult;
