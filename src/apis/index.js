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
		console.log(err);
		return [];
	}
};

export const getResults = async () => {
	try {
		const res = await axios.get(`${SATELLITE_API}/datasets-results`);
		if (res.status !== 200) return [];
		return res.data.data;
	} catch (error) {
		console.log(err);
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
        console.log(err);
		return [];
    }
};
