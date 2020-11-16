import React, { useEffect, useState } from 'react';
import key from './key';

let Weather = () => {

    let [weather, setWeather] = useState();
    let [error, setError] = useState();

    useEffect(() => {
        getWeather();
    }, [])


    const getWeather = () => {
        navigator.geolocation.getCurrentPosition(showPosition)
    }

    const showPosition = (position) => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=hourly,daily&appid=${key.weather}`)
            .then(data => data.json())
            .then(data => setWeather(data))
            .catch(() => setError(true))
    }


    return (
        <div>
            {weather ?
                <div className="content">
                    <p><span className="black-color">Your current timezone:</span> {weather.timezone}</p>
                    <p><span className="black-color">Weather:</span> {weather.current.weather[0].main}</p>
                    <p><span className="black-color">Weather description:</span> {weather.current.weather[0].description}</p>
                    <p><span className="black-color">Temprature:</span> {weather.current.temp - 273.15}°C</p>
                    <p><span className="black-color">Latitutde:</span> {weather.lat}</p>
                    <p><span className="black-color">Longitude:</span> {weather.lon}</p>
                    <p><span className="black-color">Clouds:</span> {weather.current.clouds}</p>
                    <p><span className="black-color">Humidity:</span> {weather.current.humidity}</p>
                    <p><span className="black-color">Pressure:</span> {weather.current.pressure}</p>
                    <p><span className="black-color">Wind speed:</span> {weather.current.wind_speed}</p>
                    <p><span className="black-color">Wind deg:</span> {weather.current.wind_deg}</p>
                </div>
                : <div>Loading</div>}
        </div>
    )
}

export default Weather;