import Head from "next/head";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import chatStyle from "../../styles/chat.module.css";

function LayoutChatting(props) {
	const { title, pageTitle, children } = props;

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>

			<main>
				<div style={{ background: "#2395FF", position: "fixed", width: "100%" }}>
					<div className="d-flex " style={{ justifyContent: "space-between", padding: "10px 20px 5px 10px" }}>
						<Link href="/chat" passHref>
							<MdArrowBackIos className={chatStyle.backArrow} />
						</Link>
						<h4>ROOM CHAT 1</h4>
						<div></div>
					</div>
				</div>
				<div className=" min-vh-100" style={{ background: "#E5E5E5" }}>
					<div className="pt-5">{children}</div>
				</div>
			</main>
		</div>
	);
}

export default LayoutChatting;
