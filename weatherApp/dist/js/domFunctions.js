export const setPlaceholderText = () => {
    const input = document.getElementById("searchBar__text");
    input.placeholder = "City, State, Country";
}

export const addSpinner = (element) => {
    animateButton(element);
    setTimeout(animateButton,1000, element);
}

export const animateButton = (icon) => {
    icon.classList.toggle("none")
    icon.nextElementSibling.classList.toggle("block");
    icon.nextElementSibling.classList.toggle("none");
}

export const displayError = (headerMsg, srMsg) => {
     updateWeatherLocationHeader(headerMsg);
     updateScreenReaderConfirmation(srMsg);
}

export const displayAPIError = (statusCode) => {
    const properMsg = toProperCase(statusCode.message);
    updateWeatherLocationHeader(properMsg);
    updateScreenReaderConfirmation(`${properMsg}. Please try again.`);

}

const toProperCase = (text) => {
    const words = text.split(" ");
    const properWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    })
    return properWords.join(" ");
}

const updateWeatherLocationHeader = (message) => {
    const header = document.getElementById("currentForecast__location");
    if (message.indexOf("Lat:") !==-1 && message.indexOf("Long:") !==-1) {
        const msgArray = message.split(" ");
        const mapArray = msgArray.map(elem => {
            return elem.replace(":",": ");
        })
        
        const lat = mapArray[0].indexOf("-") == -1 ? mapArray[0].slice(0,10) : mapArray[0].slice(0,11)
        const long = mapArray[1].indexOf("-") == -1 ? mapArray[1].slice(0,11) : mapArray[1].slice(0,12)
        header.textContent = `${lat}  • ${long}`;
    }
    else {
        header.textContent = message;
    }
};

export const updateScreenReaderConfirmation = (message) => {
    document.getElementById("confirmation").innerHTML = message;
}

export const updateDisplay = (weatherJson, locationObj) => {
    fadeDisplay();
    clearDisplay();
    const weatherClass = getWeatherClass(weatherJson.current.weather[0].icon)
    setBGImage(weatherClass);
    const screenReaderWeather = buildScreenReaderWeather(weatherJson, locationObj);

    updateWeatherLocationHeader(locationObj.getName());
    updateScreenReaderConfirmation (screenReaderWeather);


    //current conditions and six day forecast

    const currentConditionsArr = createCCDivs(weatherJson, locationObj.getUnit());

    displayCurrentConditions(currentConditionsArr);
    displaySixDayForecast(weatherJson);
    //re focusing onto search bar
    document.getElementById("searchBar__text").focus();
    fadeDisplay();
}

const fadeDisplay = () => {
    const currentConditions = document.getElementById("currentForecast");
    currentConditions.classList.toggle("zero-vis");
    currentConditions.classList.toggle("fade-in");

    const sixDay = document.getElementById("dailyForecast");
    sixDay.classList.toggle("zero-vis");
    sixDay.classList.toggle("fade-in");
}

const clearDisplay = () => {
    const currentConditions = document.getElementById("currentForecast__conditions");
    deleteContents(currentConditions);
    const sixDayForecast = document.getElementById("dailyForecast__contents");
    deleteContents(sixDayForecast);
}

const deleteContents = (element) => {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

const getWeatherClass = (icon) => {
    const firstTwoChars = icon.slice(0, 2);
    const lastChar = icon.slice(2);
    const weatherLookup = {
      '09': "snow",
      10: "rain",
      11: "rain",
      13: "snow",
      50: "fog"
    };
    let weatherClass;
    if (weatherLookup[firstTwoChars]) {
      weatherClass = weatherLookup[firstTwoChars];
    } else if (lastChar === "d") {
      weatherClass = "clouds";
    } else {
      weatherClass = "night";
    }
    return weatherClass;
};

const setBGImage = (weatherClass) => {
    const page = document.documentElement;
    page.className = "";
    console.log(weatherClass);
    page.classList.add(weatherClass);
}

const buildScreenReaderWeather = (weatherJson, locationObj) => {
    const location = locationObj.getName();
    const unit = locationObj.getUnit();
    const tempUnit = unit == "imperial" ? "Farenheit" : "Celsius";
    return `${weatherJson.current.weather[0].description} and ${Math.round(Number(weatherJson.current.temp))}°${tempUnit} in ${location}`;
}

const createCCDivs = (weatherObj, unit) => {
    const tempUnit = unit == "imperial" ? "F" : "c";
    const windUnit = unit == "imperial" ? "mph" : "m/s";
    const icon = createMainImgDiv(weatherObj.current.weather[0].icon, weatherObj.current.weather[0].description);
    const temp = createElem("div", "temp", `${Math.round(Number(weatherObj.current.temp))}°`, tempUnit);
    const properDescription = toProperCase(weatherObj.current.weather[0].description);
    const desc = createElem("div", "desc", properDescription);
    const feels = createElem("div", "feels", `Feels Like ${Math.round(Number(weatherObj.current.feels_like))}°`);
    const maxTemp = createElem("div", "maxtemp", `High ${Math.round(Number(weatherObj.daily[0].temp.max))}°`);
    const minTemp = createElem( "div", "mintemp", `Low ${Math.round(Number(weatherObj.daily[0].temp.min))}°`);
    const humidity = createElem("div", "humidity", `Humidity ${weatherObj.current.humidity}%`);
    const wind = createElem("div", "wind", `Wind ${Math.round(Number(weatherObj.current.wind_speed))} ${windUnit}`);
    return [icon, temp, desc, feels, maxTemp, minTemp, humidity, wind];

};

const createMainImgDiv = (icon, altText) => {
    const iconDiv = createElem("div", "icon");
    iconDiv.id="icon";
    const faIcon = translateIcontoFA(icon);
    faIcon.title = altText;
    iconDiv.appendChild(faIcon);
    return iconDiv;
};

const createElem = (elemType, divClassName, divText, unit) => {
    const div = document.createElement(elemType);
    div.className = divClassName;
    if (divText) {
        div.textContent = divText;
    }
    if (divClassName == "temp") {
        const unitDiv = document.createElement("div");
        unitDiv.className = "unit";
        unitDiv.textContent = unit;
        div.appendChild(unitDiv);
    }
    return div;
};

const translateIcontoFA = (icon) => {
    const i = document.createElement("i");
    const firstTwoChars = icon.slice(0,2);
    const lastChar = icon.slice(2);
    switch (firstTwoChars) {
        case "01":
          if (lastChar === "d") {
            i.classList.add("far", "fa-sun");
          } else {
            i.classList.add("far", "fa-moon");
          }
          break;
        case "02":
          if (lastChar === "d") {
            i.classList.add("fas", "fa-cloud-sun");
          } else {
            i.classList.add("fas", "fa-cloud-moon");
          }
          break;
        case "03":
          i.classList.add("fas", "fa-cloud");
          break;
        case "04":
          i.classList.add("fas", "fa-cloud-meatball");
          break;
        case "09":
          i.classList.add("fas", "fa-cloud-rain");
          break;
        case "10":
          if (lastChar === "d") {
            i.classList.add("fas", "fa-cloud-sun-rain");
          } else {
            i.classList.add("fas", "fa-cloud-moon-rain");
          }
          break;
        case "11":
          i.classList.add("fas", "fa-poo-storm");
          break;
        case "13":
          i.classList.add("far", "fa-snowflake");
          break;
        case "50":
          i.classList.add("fas", "fa-smog");
          break;
        default:
          i.classList.add("far", "fa-question-circle");
    }
    return i;
}

const displayCurrentConditions = (currentConditionsArr) => {
    const ccContainer = document.getElementById("currentForecast__conditions")
    currentConditionsArr.forEach(elem => {
        //console.log("displayCurrentConditions");
        ccContainer.appendChild(elem);
    })
}

const displaySixDayForecast = (weatherJson) => {
    for (let i = 1; i<=6; i++) {
        const dfArray = createDailyForecastDivs(weatherJson.daily[i]);
        //console.log(weatherJson.daily[i]);
        displayDailyForecast(dfArray);
    }
}

const createDailyForecastDivs = (data) => {
    const dateObj = new Date(data.dt*1000);
    const utcString = dateObj.toUTCString();
    const dayAbbreviationText = utcString.slice(0,3);
    const dayAbbreviation = createElem ( "p", "dayAbbreviation", dayAbbreviationText);

    const dayIcon = createDailyIcon (data.weather[0].icon, data.weather[0].description);
    const dayHigh = createElem ("p", "dayHigh",`${Math.round(Number(data.temp.max))}°`);
    const dayLow = createElem ("p", "dayLow", `${Math.round(Number(data.temp.min))}°`);
    return [dayAbbreviation, dayIcon, dayHigh, dayLow];
};

const createDailyIcon = (icon, text) => {
    const img = document.createElement("img");
    if (window.innerWidth < 768 || window.innerHeight < 1025) {
        img.src = `https://openweathermap.org/img/wn/${icon}.png`;
    } else {
        img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }
    img.alt = text;
    return img;
}

const displayDailyForecast = (dfArray) => {
    const dayDiv = createElem("div", "forecastDay");
    //(dfArray);
    //console.log("displayDailyForecast")
    dfArray.forEach((el) => {
      dayDiv.appendChild(el);
    });
    const dailyForecastContainer = document.getElementById("dailyForecast__contents");
    dailyForecastContainer.appendChild(dayDiv);
};