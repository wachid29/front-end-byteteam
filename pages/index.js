import Image from "next/image";
// layouts
import MainLayout from "layouts/MainLayout";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/free-mode";
import { EffectCards, FreeMode } from "swiper";
// icon
import { FaSearch } from "react-icons/fa";
// css
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.content}>
			<main className="container">
				<MainLayout>
					{/* Input search */}
					<form>
						<div className="input-group mt-4">
							<input
								type="text"
								className="form-control py-2 ps-4"
								placeholder="Where you want to go"
								aria-label="Recipient's username"
								aria-describedby="button-addon2"
							/>
							<button className="btn btn-primary px-3" type="submit">
								<FaSearch />
							</button>
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
								<SwiperSlide className={styles.swiper_slide}>
									<div className={styles.title_card}>
										<p className="text-white ms-3 mt-2">Tokyo,</p>
										<h1 className="text-white ms-3">Japan</h1>
										<span className="badge rounded-pill fw-bold ms-3 mt-3 px-3 py-2">15 Airlines</span>
										<p className="text-white ms-3 fixed-bottom">From $100</p>
									</div>
									<Image src="/images/image_3.png" width="240%" height="330%" />
								</SwiperSlide>
								<SwiperSlide className={styles.swiper_slide}>
									<Image src="/images/image_2.jpg" width="240%" height="330%" />
								</SwiperSlide>
								<SwiperSlide className={styles.swiper_slide}>
									<Image src="/images/image_3.png" width="240%" height="330%" />
								</SwiperSlide>
							</Swiper>
						</div>
						{/* End Swiper mode 1 */}

						{/* Swiper mode 2 */}
						{/* <div>
							<Swiper freeMode={true} grabCursor={true} modules={[FreeMode]} className="mySwiper" slidesPerView={2} spaceBetween={120}>
								<SwiperSlide>
									<div className={styles.title_card}>
										<p className="text-white ms-3 mt-2">Tokyo,</p>
										<h1 className="text-white ms-3">Japan</h1>
										<span className="badge rounded-pill fw-bold ms-3 mt-3 px-3 py-2">15 Airlines</span>
										<p className="text-white ms-3 fixed-bottom">From $100</p>
									</div>
									<div className={`card ${styles.swiper_2}`}>
										<Image src="/images/image_3.png" alt="logo" width="100%" height="330%" />
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`card ${styles.swiper_2}`}>
										<Image src="/images/image_3.png" alt="logo" width="100%" height="330%" />
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`card ${styles.swiper_2}`}>
										<Image src="/images/image_3.png" alt="logo" width="100%" height="330%" />
									</div>
								</SwiperSlide>
							</Swiper>
						</div> */}
						{/* End Swiper mode 2 */}
					</section>
					{/* End trending destination */}

					{/* Top 10 destination */}
					<section className="mt-4 mx-2">
						<h3 className="mb-3">Top 10 destination</h3>
						<div>
							<Swiper freeMode={true} grabCursor={true} modules={[FreeMode]} className="mySwiper" slidesPerView={4} spaceBetween={90}>
								<SwiperSlide>
									<div className={`d-flex justify-content-center flex-column align-items-center ${styles.swiper_circle_title}`}>
										<div className={`card border border-2 border-primary rounded-circle p-1 ${styles.swiper_circle}`}>
											<Image src="/images/image_2.jpg" alt="logo" width="100%" height="100%" className="rounded-circle" />
										</div>
										<p className="mt-2 text-muted">Japan</p>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`d-flex justify-content-center flex-column align-items-center ${styles.swiper_circle_title}`}>
										<div className={`card border border-2 border-primary rounded-circle p-1 ${styles.swiper_circle}`}>
											<Image src="/images/image_3.png" alt="logo" width="100%" height="100%" className="rounded-circle" />
										</div>
										<p className="mt-2 text-muted">Japan</p>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`d-flex justify-content-center flex-column align-items-center ${styles.swiper_circle_title}`}>
										<div className={`card border border-2 border-primary rounded-circle p-1 ${styles.swiper_circle}`}>
											<Image src="/images/image_3.png" alt="logo" width="100%" height="100%" className="rounded-circle" />
										</div>
										<p className="mt-2 text-muted">Japan</p>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`d-flex justify-content-center flex-column align-items-center ${styles.swiper_circle_title}`}>
										<div className={`card border border-2 border-primary rounded-circle p-1 ${styles.swiper_circle}`}>
											<Image src="/images/image_3.png" alt="logo" width="100%" height="100%" className="rounded-circle" />
										</div>
										<p className="mt-2 text-muted">Japan</p>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`d-flex justify-content-center flex-column align-items-center ${styles.swiper_circle_title}`}>
										<div className={`card border border-2 border-primary rounded-circle p-1 ${styles.swiper_circle}`}>
											<Image src="/images/image_3.png" alt="logo" width="100%" height="100%" className="rounded-circle" />
										</div>
										<p className="mt-2 text-muted">Japan</p>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`d-flex justify-content-center flex-column align-items-center ${styles.swiper_circle_title}`}>
										<div className={`card border border-2 border-primary rounded-circle p-1 ${styles.swiper_circle}`}>
											<Image src="/images/image_3.png" alt="logo" width="100%" height="100%" className="rounded-circle" />
										</div>
										<p className="mt-2 text-muted">Japan</p>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`d-flex justify-content-center flex-column align-items-center ${styles.swiper_circle_title}`}>
										<div className={`card border border-2 border-primary rounded-circle p-1 ${styles.swiper_circle}`}>
											<Image src="/images/image_3.png" alt="logo" width="100%" height="100%" className="rounded-circle" />
										</div>
										<p className="mt-2 text-muted">Japan</p>
									</div>
								</SwiperSlide>
							</Swiper>
						</div>
					</section>
					{/* End Top 10 destination */}
				</MainLayout>
			</main>
		</div>
	);
}
