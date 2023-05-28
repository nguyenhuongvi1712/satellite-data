export const actionType = {
	SET_MAP_MODE: 'SET_MAP_MODE',
	SET_LAT_LNG: 'SET_LAT_LNG',
	SET_ADDRESS: 'SET_ADDRESS',
	SET_IS_OPEN_INFO: 'SET_IS_OPEN_INFO',
	SET_CURRENT_WEATHER: 'SET_CURRENT_WEATHER',
	SET_IS_LOADING_INFO: 'SET_IS_LOADING_INFO',
	SET_FORECAST_DATA: 'SET_FORECAST_DATA',
	SET_USGS_DATA: 'SET_USGS_DATA',
    SET_CENTER: 'SET_CENTER'
};

const reducer = (state, action) => {
  switch (action.type) {
		case actionType.SET_MAP_MODE:
			return { ...state, mapMode: action.mapMode };
		case actionType.SET_LAT_LNG:
			return { ...state, latlng: action.latlng };
		case actionType.SET_ADDRESS:
			return { ...state, address: action.address };
		case actionType.SET_IS_OPEN_INFO:
			return { ...state, isOpenInfo: action.isOpenInfo };
		case actionType.SET_CURRENT_WEATHER:
			return { ...state, currentWeather: action.currentWeather };
		case actionType.SET_IS_LOADING_INFO:
			return { ...state, isLoadingInfo: action.isLoadingInfo };
		case actionType.SET_FORECAST_DATA:
			return { ...state, forecastData: action.forecastData };
		case actionType.SET_USGS_DATA:
			return {
				...state,
				usgsData: action.usgsData,
			};
		case actionType.SET_CENTER:
			return {
				...state,
				center: action.center,
			};
		default:
			return state;
  }
};

export default reducer;
