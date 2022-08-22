import useSWR from "swr";
import fetcher from "@utils/axios/fetcher";

// Components
import MyBookingCard from "@components/cards/MyBookingCard";

export default function MyBookingList({ id }) {
	const { data, error } = useSWR("myBooking", () => fetcher.findMyBooking(id));

	return <>{data && data?.map((el) => <MyBookingCard key={el.id_booking} user={id} booking={el} />)}</>;
}
