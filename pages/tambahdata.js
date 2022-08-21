import React, { useEffect } from "react";
import { database } from "../firebase";
import { ref, set } from "firebase/database";

function Tambahdata() {
	React.useEffect(() => {
		const starCountRef = ref(database, `notification/2/${new Date().getTime()}`);
		set(starCountRef, {
			title: "Booking Succes",
			notif: "Lorem Ipsum2",
			time: new Date().getTime(),
			user_id: 3,
			status_notif: "sended",
		});
	}, []);
	return <></>;
}

export default Tambahdata;
