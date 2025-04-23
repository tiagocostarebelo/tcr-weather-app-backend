import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const API_KEY = process.env.OPENWEATHER_API_KEY;
const CURRWEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

router.post('/', async (req, res) => {
    const { type, value } = req.body;
    console.log(req.body);

    try {
        let url;

        if (type === 'city') {
            const city = req.body.value;
            console.log(city);
            url = `${CURRWEATHER_URL}?q=${city}&units=metric&appid=${API_KEY}`;
        } else if (type === 'coords') {
            const { lat, lon } = value;
            console.log(lat, lon);
            url = `${CURRWEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        } else {
            return res.status(400).json({ error: 'Invalid location type' });
        }

        const response = await axios.get(url);
        const weatherData = response.data;
        console.log(weatherData);

        const filteredWeatherData = {
            city: weatherData.name,
            country: weatherData.sys.country,
            main: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
            temperature: weatherData.main.temp,
            feelsLike: weatherData.main.feels_like,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed
        };

        res.status(200).json(filteredWeatherData);

    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
})


export default router;