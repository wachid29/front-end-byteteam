import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import fetcher from "@utils/axios/fetcher";
// icon
import { BsArrowLeftRight, BsArrowRight } from "react-icons/bs";
// css
import LayoutBgImg from "@components/layouts/LayoutBgImg";

function SearchFlight(props) {
	const { place } = props;
	// query param search index
	const router = useRouter();
	const query = router.query;
	const { searchDestination } = query;
	// state search data in query params
	const [from, setFrom] = useState({ cityFrom: "" });
	const [to, setTo] = useState({ cityTo: place.find((el) => el.city.toLowerCase() === searchDestination)?.id_place || "" });
	const [date, setDate] = useState({ date: "" });
	const [radioClass, setRadioClass] = useState({ classFlight: "" });
	const [peopleAdult, setPeopleAdul] = useState({ adult: "" });
	const [peopleChild, setPeopleChild] = useState({ child: "" });
	// country
	const [fromCountry, setFromCountry] = useState("Country");
	const [toCountry, setToCountry] = useState(place.find((el) => el.city.toLowerCase() === searchDestination)?.country || "Country");
	// data radio button
	let whichClass = ["Economy", "Business", "First Class"];

	return (
		<LayoutBgImg title="Search Flight - Ticketing Website">
			<form>
				<div className="mt-5 mb-3">
					<span className="text-white poppins fs-24 fw-semibold">Destinations</span>
				</div>
				<div className="d-flex flex-column rounded-4 bg-white px-4 py-3 gap-1 shadow">
					<div className="d-flex justify-content-between">
						<span className="lato fs-12 text-gray">From</span>
						<span className="lato fs-12 text-gray">To</span>
					</div>
					<div className="d-flex justify-content-between align-items-center">
						<select
							className="m-0 p-0 form-control fs-18 fw-semibold cursor-pointer"
							style={{
								width: "auto",
								border: "none",
							}}
							onChange={(e) => {
								setFrom({ cityFrom: e.target.value });
								setFromCountry(place.find((res) => res.id_place === parseInt(e.target.value)).country);
							}}>
							{place
								.sort((a, b) => (a.city > b.city ? 1 : -1))
								.map((item) => (
									<option value={item?.id_place} key={item?.id_place}>
										{item?.city}
									</option>
								))}
						</select>
						<div>
							<BsArrowLeftRight size={20} className="text-blue" />
						</div>
						<select
							className="m-0 p-0 form-control fs-18 fw-semibold text-end cursor-pointer"
							style={{
								width: "auto",
								border: "none",
							}}
							value={to.cityTo}
							onChange={(e) => {
								setTo({ cityTo: e.target.value });
								setToCountry(place.find((res) => res.id_place === parseInt(e.target.value)).country);
							}}>
							{place
								.sort((a, b) => (a.city > b.city ? 1 : -1))
								.map((item, i) => (
									<option key={i} value={item?.id_place}>
										{item?.city}
									</option>
								))}
						</select>
					</div>
					<div className="d-flex justify-content-between">
						<span className="lato fs-12 text-gray">{fromCountry}</span>
						<span className="lato fs-12 text-gray">{toCountry}</span>
					</div>
				</div>

				{/* <div className="mt-4 px-2">
					<button className="btn fw-bold py-2  btn-primary" type="button">
						<FaPlaneDeparture size="1.5rem" className="me-2" /> One way
					</button>
					<button className="btn btn-secondary float-end fw-bold py-2" type="button">
						<BsArrowClockwise size="1.5rem" className="me-2" /> Round trip
					</button>
				</div> */}

				{/*Input Departure */}
				<div className="row g-2 mt-3 px-2">
					<span className="fs-14 fw-medium text-gray">Departure</span>
					<input type="date" className="form-control mb-3 p-3" value={date.date} onChange={(event) => setDate({ date: event.target.value })} />
					<span className="fs-14 fw-medium text-gray">How many person ?</span>
					<div className="col-6">
						<input
							type="number"
							className="form-control mb-3 p-3"
							placeholder="Adult"
							min={0}
							value={peopleAdult.adult}
							onChange={(event) => setPeopleAdul({ adult: event.target.value })}
						/>
					</div>
					<div className="col-6 mb-2">
						<input
							type="number"
							className="form-control mb-3 p-3"
							placeholder="Child"
							min={0}
							value={peopleChild.child}
							onChange={(event) => setPeopleChild({ child: event.target.value })}
						/>
					</div>
					<span className="fs-14 fw-medium text-gray">Which class do you want ?</span>
					<div className="d-flex justify-content-between">
						{whichClass.map((result, i) => (
							<div key={i} className="form-check form-check-inline">
								<input
									className="form-check-input cursor-pointer"
									type="radio"
									value={result}
									name="radioValues"
									id={`inlineRadio${i}`}
									onClick={(event) => setRadioClass({ classFlight: event.target.value })}
								/>
								<label className="form-check-label fs-14 fw-bold cursor-pointer" htmlFor={`inlineRadio${i}`} value={radioClass.classFlight}>
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
						<a className="d-flex align-items-center py-3 px-4 justify-content-between btn btn-blue fs-18 fw-bold text-start mt-5" type="button">
							<span>SEARCH FLIGHT</span>
							<BsArrowRight size={24} />
						</a>
					</Link>
				</div>
			</form>
		</LayoutBgImg>
	);
}

export default SearchFlight;

export const getServerSideProps = async () => {
	const place = await fetcher.getPlace();

	return {
		props: { place },
	};
};
