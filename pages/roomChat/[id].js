import React, { useState } from "react";
import LayoutChat from "@components/layouts/LayoutChatting";
import { database } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import { hasCookie, getCookie } from "cookies-next";
import { decryptData } from "@utils/crypto";
import fetcher from "@utils/axios/fetcher";
import { FiSend } from "react-icons/fi";

//componen
import SenderMsgBox from "@components/chat/senderMsgBox";
import ReceiverMsgBox from "@components/chat/receiverMsgBox";

function roomChat(props) {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [keys, setkeys] = useState([]);
	const { user } = props;
	const messageEndRef = React.useRef();

	React.useEffect(() => {
		const starCountRef = ref(database, `messages/1`);
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			if (data && typeof data == "object") {
				setMessages(data);
				setkeys(Object.keys(data));
				scroll();
			}
		});
	}, []);

	const handlechat = () => {
		const starCountRef = ref(database, `messages/1/${new Date().getTime()}`);
		if (message !== "") {
			set(starCountRef, {
				message: message,
				message_time: new Date().getTime(),
				user_id: user.id,
				message_notif: "sended",
				name: user.fullname,
			});
			setMessage("");
		}
	};

	const scroll = () => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<>
			<LayoutChat>
				<div className="mt-2">
					{keys?.map((item) => {
						let current = messages[item];

						if (current?.user_id === user?.id) return <SenderMsgBox {...current} />;
						if (current?.user_id !== user?.id) return <ReceiverMsgBox {...current} />;
					})}
				</div>
				<div>
					<div className="d-flex align-items-end min-vh-70 container">
						<div className="input-group input-group-lg mb-5">
							<input
								type="text"
								className="form-control"
								placeholder="Type message here.."
								aria-label="messages"
								aria-describedby="basic-addon1"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
							<button
								className="btn "
								type="button"
								id="button-addon2"
								style={{ background: "#2395FF", color: "#FFFFFF" }}
								onClick={() => handlechat()}>
								<FiSend />
							</button>
						</div>
					</div>
				</div>
			</LayoutChat>
		</>
	);
}

export const getServerSideProps = async ({ req }) => {
	if (hasCookie("token", { req }) && hasCookie("datas", { req })) {
		const user = decryptData(getCookie("datas", { req }));
		const userProfile = await fetcher.getProfile(user?.id);

		return {
			props: {
				user: userProfile,
			},
		};
	}
};

export default roomChat;
