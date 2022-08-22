import Link from "next/link";
// icon
import { FaPlaneDeparture } from "react-icons/fa";
// css
import styles from "../../styles/destinationResult.module.css";
// Components
import LayoutBgPlaneGray from "@components/layouts/LayoutBgPlaneGray";
import fetcher from "@utils/axios/fetcher";

function SearchResult(props) {
	const { ticket, totalTicket, from, to, date, classFlight, peopleAdult, peopleChild } = props;
	const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });

	return (
		<LayoutBgPlaneGray
			title="Search Flight - Ticketing Website"
			date={date}
			placeFrom={from}
			placeTo={to}
			classFlight={classFlight}
			peopleAdult={peopleAdult}
			peopleChild={peopleChild}>
			<div className="d-flex flex-column w-100 mt-2 mb-5 p-4 gap-3">
				<div className="d-flex align-items-center justify-content-between">
					<span className="text-gray text-start fw-medium">{`${totalTicket} flight found`}</span>
				</div>
				{ticket?.map((item, i) => (
					<Link
						key={i}
						href={{
							pathname: `/flights/${item?.id_ticket}`,
							query: { peopleChild, peopleAdult },
						}}>
						<div
							key={item?.id_ticket}
							className={`card mb-2 border-top-0 border-start-0 border-end-0 border cursor-pointer border-bottom-4 ${styles.d_card}`}>
							<div className="row h-100 pb-3 m-0">
								<div className="col-7 d-flex flex-column p-0">
									<div className="d-flex align-items-center justify-content-between">
										<span className="fs-28 fw-medium">{item?.place1[0]?.city_code}</span>
										<FaPlaneDeparture size={24} className="text-gray" />
										<span className="fs-28 fw-medium">{item?.place2[0]?.city_code}</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<span className="text-gray">{item?.from_time?.split(":").splice(0, 2).join(":")}</span>
										<span className="text-gray">{item?.to_time?.split(":").splice(0, 2).join(":")}</span>
									</div>
									<span className="text-darkgray fw-semibold mt-auto fs-16">{item?.name}</span>
								</div>
								<div className="col-5 d-flex flex-column gap-2 pt-2 text-end p-0">
									<span className="text-gray">
										Terminal <b className="text-dark">{item?.from_terminal}</b>
									</span>
									<span className="text-gray">
										Gate <b className="ms-3 text-dark">{item?.from_gate}</b>
									</span>
									<span className="text-blue fs-16 mt-auto fw-bold">
										{formatter.format(item?.price * (parseInt(peopleChild) + parseInt(peopleAdult)))}
									</span>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</LayoutBgPlaneGray>
	);
}

export default SearchResult;

export const getServerSideProps = async ({ query }) => {
	const params = { id_from_place: query.from, id_to_place: query.to, from_date: query.date, class_flight: query.classFlight };
	const ticket = await fetcher.searchTicket(params).catch(() => ({ ticket: null, jumlahData: 0 }));
	const from = await fetcher.findOnePlace(query.from);
	const to = await fetcher.findOnePlace(query.to);

	console.log(from, to);

	return {
		props: {
			ticket: ticket.ticket,
			totalTicket: ticket.jumlahData,
			from,
			to,
			date: query.date,
			classFlight: query.classFlight,
			peopleAdult: query.peopleAdult,
			peopleChild: query.peopleChild,
		},
	};
};
