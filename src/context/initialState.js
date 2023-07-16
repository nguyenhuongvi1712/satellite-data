export const initialState = {
	latlng: new L.latLng(53.36254, -172.06214),
	address: '',
	mapMode: {},
	isOpenInfo: false,
	currentWeather: null,
	isLoadingInfo: true,
	forecastData: null,
	usgsData: [],
	dataSetIds: [],
	center: [53.36254, -172.06214],
	cartItems: JSON.parse(localStorage.getItem('cartItems')) ?? [],
	dataGoogleEarthEngine: null,
	boundPosition: {},
	zoom: 5,
	queryParams: {
		channelId: '',
		mapView: null,
		timeStartReq: '',
		timeEndReq: '',
		enableHyperResolution: false,
        polygon: []
	}
};
