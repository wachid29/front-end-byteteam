import React, { useState } from "react";
import { database } from "../firebase";
import { ref, set } from "firebase/database";
//test
function Tambahdata() {
	let id_user = 3;
	const [message, setMessage] = useState("");
	const [succes, setSucces] = useState(false);

	const handleAddData = () => {
		const starCountRef = ref(database, `notif/${id_user}/${new Date().getTime()}`);
		set(starCountRef, {
			title: "Ticket Booked",
			notif: "Selamat, \n Ticket Pesawat Lion Air CGK - SUB berhasil dibooking",
			time: new Date().getTime(),
			user_id: 3,
			status_notif: "sended",
		});
		if (starCountRef) {
			setSucces(true);
			setMessage("data berhasil ditambah");
		}
	};
	return (
		<>
			<div className="mt-5">
				{succes ? (
					<div className="alert alert-warning" role="alert">
						{message}
					</div>
				) : null}
				<button type="button" className="btn btn-primary" onClick={handleAddData}>
					Add Data
				</button>
			</div>
		</>
	);
}

export default Tambahdata;
