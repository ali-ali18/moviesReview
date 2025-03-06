import axios from "axios";

const API_KEY =
	"4afd8bade7f6352f5257e365ea79bbda";

const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	params: {
		api_key: API_KEY,
	},
	headers: {
		"Content-Type": "application/json",
	},
	
});

export default api;
