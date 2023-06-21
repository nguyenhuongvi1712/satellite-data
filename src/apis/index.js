import {
	CURRENT_WEATHER_API,
	WEATHER_FORECAST_API,
	SATELLITE_API,
} from './baseUrl';
import axios from 'axios';

export const OWM_API_KEY = 'd0672c5951da1c0fd99d64e85831f77a';

const geocoder = new google.maps.Geocoder();

export const getAddress = async (latlng) => {
	try {
		const { results } = await geocoder.geocode({ location: latlng.wrap() });
		if (results[0]) {
			return results.length >= 2
				? results[1].formatted_address
				: results[0].formatted_address;
		} else {
			return 'Cannot locate address.';
		}
	} catch (err) {
		window.alert('Geocoder failed due to: ' + err);
	}
};

export const getCurrentWeather = async (lat, lon) => {
	try {
		const url = `${CURRENT_WEATHER_API}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}`;
		const res = await axios(url);

		if (res.status !== 200) return null;
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const getForecastWeather = async (lat, lon, limit = 10) => {
	try {
		const url = `${WEATHER_FORECAST_API}?lat=${lat}&lon=${lon}&cnt=${limit}&appid=${OWM_API_KEY}`;
		const res = await axios(url);
		if (res.status !== 200) return null;
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const getDataSets = async () => {
	try {
		const res = await axios.get(`${SATELLITE_API}/datasets`);
		if (res.status !== 200) return [];
		return res.data.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getResults = async () => {
	try {
		const res = await axios.get(`${SATELLITE_API}/datasets-results`);
		if (res.status !== 200) return [];
		return res.data.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getPositionByLatLon = async ({ lat, lon, radius }) => {
	try {
		const res = await axios.get(
			`${SATELLITE_API}/google-earth-engines/satellite-circle-lat-lon?bands=B1&lat=${lat}&lon=${lon}&radius=${radius}`,
		);
		if (res.status !== 200) return [];
		return res.data.data;
	} catch (error) {
        console.log(error);
		return [];
    }
};

export const renderNavbar = async () => {
	try {
		const res = await axios.get(`${SATELLITE_API}/navbar-resolutions/get-navbar`)
		if (res.status !== 200) return [];
		return res.data.data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export const getImageGoogleEarthEngine = async ({channelId, boundaryData,timeStartReq,timeEndReq }) => {
	try {
		var url = `${SATELLITE_API}/google-earth-engines/render-from-channel-id?`
		if (channelId) {
			url += `chanelId=${channelId}&`
		}
		if (boundaryData) {
			const { south, north, west, east } = boundaryData;
			url +=`boundaryData=${east},${north},${south},${west}&`
		}
		if (timeStartReq) {
			url +=`timeStartReq=${timeStartReq}&`
		}
		if (timeEndReq) {
			url += `timeEndReq=${timeEndReq}&`
		}
		const res = await axios.get(url)
		if (res.status !== 200) return {};
		return res.data.data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export const autoSuggest = async ({keyword}) => {
	try {
		const apiKey = "FKQbWs-wrePG3l2YwMYSSbLqDjBesyQkSZSYg8iUmmk"
		const res = await axios.get(`https://autosuggest.search.hereapi.com/v1/autosuggest?at=0,0&q=${keyword}&apiKey=${apiKey}`)
		return res.data
	} catch (error) {
		console.log(error)
		return []
	}
}