import axios from "axios";

export default async function handler(req, res) {
	try {
		const request = await axios.get("https://ticket-byte-v1.herokuapp.com/place").then((response) => res.json(response.data));
		if (request.length > 0) {
			res.status(200).json(request.data);
		} else {
			res.status(400).json("Data not found!");
		}
	} catch (error) {
		res.status(400).json("Something error");
	}
}

// axios
// 	.get("https://ticket-byte-v1.herokuapp.com/place")
// 	.then((response) => res.status(200).json(response.data))
// 	.catch((error) => res.status(400).json({ message: error?.response?.data }));
