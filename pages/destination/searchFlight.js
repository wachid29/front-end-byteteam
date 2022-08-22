import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
// icon
import { BsArrowLeftRight, BsArrowClockwise, BsArrowRight, BsArrowsFullscreen } from "react-icons/bs";
import { FaPlaneDeparture, FaChevronLeft } from "react-icons/fa";
// css
import styles from "../../styles/destination.module.css";

function searchFlight() {
	const [data, setData] = useState([]);
	// query param search index
	const router = useRouter();
	const query = router.query;
	const { searchDestination } = query;
	useEffect(() => {
		axios.get("/api/place").then((res) => {
			let location = res.data.place;
			setData(location);
		});
	}, []);

	// state search data in query params
	const [from, setFrom] = useState({ cityFrom: "1" });
	const [to, setTo] = useState({ cityTo: "1" });
	const [date, setDate] = useState({ date: "" });
	const [radioClass, setRadioClass] = useState({ classFlight: "" });
	const [peopleAdult, setPeopleAdul] = useState({ adult: "" });
	const [peopleChild, setPeopleChild] = useState({ child: "" });
	// country
	const [fromCountry, setFromCountry] = useState("Country");
	const [toCountry, setToCountry] = useState("Country");
	// data radio button
	let whichClass = ["Economy", "Business", "First Class"];
	return (
		<div className={`p-0 m-0 ${styles.content}`}>
			<div className={`p-0 m-0 ${styles.d_header}`}>
				<div className={styles.title}>
					<Link href="/" passHref>
						<a className="text-decoration-none text-white fw-bold ms-3">
							<FaChevronLeft size="1.5rem" className="mt-4" />
						</a>
					</Link>
					<button type="button" className="btn float-end mt-3 me-2">
						<BsArrowsFullscreen size="1.5rem" className="text-white" />
					</button>
					<h1 className="text-white ms-4">Destination</h1>
				</div>
				<Image src="/images/image_1.svg" layout="fill" objectFit="cover" />
			</div>
			{/* content */}
			<main className="container px-4 pb-5">
				<form>
					<div className={`card px-4 py-3 shadow ${styles.card_destination}`}>
						<div className="d-flex justify-content-between">
							<p className="text-muted">From</p>
							<p className="text-muted">To</p>
						</div>
						<div className="d-flex justify-content-between">
							{/* select from */}
							<select
								className="m-0 form-control"
								value={from.cityFrom}
								onChange={(event) => {
									setFrom({
										// cityFrom: event.target.options[event.target.selectedIndex].text,
										cityFrom: event.target.value,
									});
									setFromCountry(data.find((res) => res.id_place === parseInt(event.target.value)).country);
								}}>
								{data
									.sort((a, b) => (a.city > b.city ? 1 : -1))
									.map((item) => (
										<option value={item?.id_place} key={item?.id_place}>
											{item?.city}
										</option>
									))}
							</select>
							<h4 className="text-primary">
								<BsArrowLeftRight />
							</h4>
							{/* select to */}
							<select
								className="m-0 form-control"
								// value={to.cityTo}
								value={null}
								onChange={(event) => {
									setTo({
										// cityTo: event.target.options[event.target.selectedIndex].text,
										cityTo: event.target.value,
									});
									setToCountry(data.find((res) => res.id_place === parseInt(event.target.value)).country);
								}}>
								{data
									.sort((a, b) => (a.city > b.city ? 1 : -1))
									.map((item) => (
										<option selected={searchDestination === item?.city.toLowerCase()}>{item?.city}</option>
									))}
							</select>
						</div>
						<div className="d-flex justify-content-between mt-2">
							<p>{fromCountry}</p>
							<p>{toCountry}</p>
						</div>
					</div>

					<div className="mt-4 px-2">
						<button className="btn fw-bold py-2  btn-primary" type="button">
							<FaPlaneDeparture size="1.5rem" className="me-2" /> One way
						</button>
						<button className="btn btn-secondary float-end fw-bold py-2" type="button">
							<BsArrowClockwise size="1.5rem" className="me-2" /> Round trip
						</button>
					</div>

					{/*Input Departure */}
					<div className="row g-2 mt-3 px-2">
						<h3 className="text-muted">Departure</h3>
						<input type="date" className="form-control mb-3" value={date.date} onChange={(event) => setDate({ date: event.target.value })} />
						<h3 className="text-muted">How many person ?</h3>
						<div className="col-6">
							<input
								type="number"
								className="form-control mb-3"
								placeholder="Adult"
								value={peopleAdult.adult}
								onChange={(event) => setPeopleAdul({ adult: event.target.value })}
							/>
						</div>
						<div className="col-6 mb-2">
							<input
								type="number"
								className="form-control mb-3"
								placeholder="Child"
								value={peopleChild.child}
								onChange={(event) => setPeopleChild({ child: event.target.value })}
							/>
						</div>
						<h3 className="text-muted">Which class do you want ?</h3>
						<div className="d-flex justify-content-around mb-3">
							{whichClass.map((result) => (
								<div className="form-check form-check-inline">
									<input
										className="form-check-input mt-2"
										type="radio"
										value={result}
										name="radioValues"
										id="inlineRadio1"
										onClick={(event) => setRadioClass({ classFlight: event.target.value })}
									/>
									<label class="form-check-label fw-bold" for="inlineRadio1" value={radioClass.classFlight}>
										{result}
									</label>
								</div>
							))}
						</div>
						<Link
							href={{
								pathname: "/destination/searchResult",
								query: {
									from: from.cityFrom,
									to: to.cityTo,
									date: date.date,
									classFlight: radioClass.classFlight,
									peopleAdult: peopleAdult.adult,
									peopleChild: peopleChild.child,
								},
							}}
							passHref>
							<a className="btn btn-primary py-2 fw-bold text-start ps-5" type="button">
								SEARCH FLIGHT <BsArrowRight size="2rem" className="float-end me-4 pb-2" />
							</a>
						</Link>
					</div>
				</form>
			</main>
		</div>
	);
}

export default searchFlight;
