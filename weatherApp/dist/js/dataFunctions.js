const WEATHER_API_KEY = '38c04e935ed4d2952afbeecccc88a0e7'
const WEATHER_API_KEY_1 = '26bebd7744e3ac5178421e70288ffc36'

export const setLocationObject = (locationObject, coordsObj) => {
    const {lat, lon, name, unit } = coordsObj;
    locationObject.setLat(lat);
    locationObject.setLon(lon);
    locationObject.setName(name);
    if (unit) {
        locationObject.setUnit(unit);
    }
}

export const getHomeLocation = () => {
    return localStorage.getItem("defaultWeatherLocation");
}

export const getWeatherFromCoords = async (locationObj) => {
    const lat = locationObj.getLat();
    const lon = locationObj.getLon();
    const units = locationObj.getUnit();
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        //console.log(weatherJson);
        return weatherJson;
    }
    catch (err) {
        console.error(err);
    }
}

export const getCoordsFromAPI = async(entryText, units) => {
    const regex = /^\d+$/g;
    const flag = regex.test(entryText) ? "zip" : "q";
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`
    const encodedUrl = encodeURI(url);

    try {
        const dataStream = await fetch(encodedUrl);
        const jsonData = await dataStream.json();
        //console.log(jsonData);
        return jsonData;
    }
    catch (err) {
        console.error(err.stack);
    }

}

export const cleanText = (text) => {
    const regex = / {2,}/g;
    const entryText = text.replaceAll(regex," ").trim();
    return entryText;
}