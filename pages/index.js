import { useEffect, useState } from "react";
import Link from "next/link";
import fetcher from "@utils/axios/fetcher";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, FreeMode } from "swiper";
// icon
import { FaSearch } from "react-icons/fa";
// css
import styles from "../styles/Home.module.css";
// Components
import LayoutNavbar from "@components/layouts/LayoutNavbar";

export default function Home(props) {
	const { place } = props;

	const [searchDestination, setSearchDestination] = useState({ searchTo: "" });
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<LayoutNavbar title="Home - Ticketing Website" pageTitle="Explore" page="home" hasChat hasNotif>
			{/* Input search */}
			<form onSubmit={handleSubmit}>
				<div className="input-group">
					<input
						type="text"
						className="form-control py-2 ps-4"
						placeholder="Where you want to go"
						aria-label="Recipient's username"
						aria-describedby="button-addon2"
						value={searchDestination.searchTo.toLowerCase()}
						onChange={(event) => setSearchDestination({ searchTo: event.target.value })}
					/>
					<Link
						href={{
							pathname: "/destination/searchFlight",
							query: {
								searchDestination: searchDestination.searchTo,
							},
						}}
						passHref>
						<button className="btn btn-primary px-3" type="submit">
							<FaSearch />
						</button>
					</Link>
				</div>
			</form>
			{/* End input search */}

			{/* Trending destination */}
			<section className="mt-5 mx-2">
				<div className="d-flex justify-content-between">
					<h3>Trending destination</h3>
					<a href="#" className="text-primary text-decoration-none fw-bold">
						View all
					</a>
				</div>
				{/* Swiper mode 1 */}
				<div className="mt-4">
					<Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className={`mySwiper ${styles.swiper}`}>
						{place.map((item) => (
							<SwiperSlide key={item?.id_place} className={styles.swiper_slide}>
								<div className={styles.title_card}>
									<p className="text-white ms-3 mt-2">{item?.city}</p>
									<h1 className="text-white ms-3">{item?.country}</h1>
									<span className="badge rounded-pill fw-bold ms-3 mt-3 px-3 py-2">15 Airlines</span>
									<p className="text-white ms-3 fixed-bottom">From $100</p>
								</div>
								{/* domain Image any problem */}
								{/* <Image src={item?.city_picture} width="240%" height="330%" />  */}
								<img src={item?.city_picture} alt="Image" />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				{/* End Swiper mode 1 */}

				{/* Swiper mode 2 */}
				{/*  
						<div>
							<Swiper freeMode={true} grabCursor={true} modules={[FreeMode]} className="mySwiper" slidesPerView={2} spaceBetween={120}>
								{data.map((item) => (
									<SwiperSlide>
										<div key={item?.id_place} className={styles.title_card}>
											<p className="text-white ms-3 mt-2">{item?.city}</p>
											<h1 className="text-white ms-3">{item?.country}</h1>
											<span className="badge rounded-pill fw-bold ms-3 mt-3 px-3 py-2">15 Airlines</span>
											<p className="text-white ms-3 fixed-bottom">From $100</p>
										</div>
										<div className={`card ${styles.swiper_2}`}>
											domain Image any problem
											<Image src="/images/image_3.png" alt="logo" width="100%" height="330%" />
											<img src={item?.city_picture} alt="Image" />
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
						*/}
				{/* End Swiper mode 2 */}
			</section>
			{/* End trending destination */}

			{/* Top 10 destination */}
			<section className="mt-4 mx-2">
				<h3 className="mb-3">Top 10 destination</h3>
				<div>
					<Swiper freeMode={true} grabCursor={true} modules={[FreeMode]} className="mySwiper" slidesPerView={4} spaceBetween={90}>
						{/* Using api get all place */}
						{place.map((item) => (
							<SwiperSlide key={item?.id_place}>
								<div className={`d-flex justify-content-center flex-column align-items-center ${styles.swiper_circle_title}`}>
									<div className={`card border border-2 border-primary rounded-circle p-1 ${styles.swiper_circle}`}>
										{/* any problem domain image */}
										{/* <Image src="/images/image_2.jpg" alt="logo" width="100%" height="100%" className="rounded-circle" /> */}
										<img src={item?.city_picture} className="rounded-circle" alt="Image" />
									</div>
									<p className="mt-2 text-muted">{item?.country}</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>
			{/* End Top 10 destination */}
		</LayoutNavbar>
	);
}

export const getServerSideProps = async () => {
	const place = await fetcher.getPlace();

	return {
		props: { place },
	};
};
