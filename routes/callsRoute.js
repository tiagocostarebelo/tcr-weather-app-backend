import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const openWeather = {
    API_KEY: process.env.OPENWEATHER_API_KEY,
    CURRWEATHER_URL: 'https://api.openweathermap.org/data/2.5/weather',
}

const unsplash = {
    API_KEY: process.env.UNSPLASH_ACCESS_KEY,
    UNSPLASH_URL: 'https://api.unsplash.com/search/photos',
    IMG_ORIENTATION: '&orientation=landscape'
}

router.post('/', async (req, res) => {
    const { type, value } = req.body;

    try {
        let url;

        if (type === 'city') {
            const city = req.body.value;
            url = `${openWeather.CURRWEATHER_URL}?q=${city}&units=metric&appid=${openWeather.API_KEY}`;
        } else if (type === 'coords') {
            const { lat, lon } = value;
            url = `${openWeather.CURRWEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${openWeather.API_KEY}`;
        } else {
            return res.status(400).json({ error: 'Invalid location type' });
        }

        const response = await axios.get(url);
        const weatherData = response.data;

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


        let unsplashData;
        try {
            const unsplashRes = await axios.get(`${unsplash.UNSPLASH_URL}`, {
                params: {
                    query: filteredWeatherData.city,
                    orientation: 'landscape',
                    client_id: unsplash.API_KEY
                }
            });

            if (unsplashRes.data.results.length === 0) {
                const unsplashRes = await axios.get(`${unsplash.UNSPLASH_URL}`, {
                    params: {
                        query: filteredWeatherData.country,
                        orientation: 'landscape',
                        client_id: unsplash.API_KEY
                    }
                });
            }
            unsplashData = {
                unsplashImageUrl: unsplashRes.data.results[0].urls.regular,
                name: unsplashRes.data.results[0].user.name,
                unsplash_link: unsplashRes.data.results[0].user.links.html
            }
        } catch (error) {
            console.error('Error fetching image data:', error.message);
            res.status(500).json({ error: 'Failed to fetch image data' });
        }

        res.status(200).json({
            weather: filteredWeatherData,
            image: unsplashData
        });

    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }


})


export default router;