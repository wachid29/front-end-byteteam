import React from "react";

let datas = {};

if (typeof window !== "undefined") {
	datas = localStorage.getItem("datas");

	if (datas) {
		datas = JSON.parse(datas);
	}
}

export const ProfileContext = React.createContext(datas);
