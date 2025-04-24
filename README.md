# Weather App - Backend (MVP)

## Overview

This directory contains the Node.js backend service for the MVP version of this Weather App. Built with Express.js, this server performs two primary functions:

1.  **Serves the Frontend:** Delivers the static HTML, CSS, and JavaScript files for the Weather App Frontend.
2.  **Acts as an API Proxy/Aggregator:** Provides a dedicated API endpoint (`/api/weather`) that securely handles requests from the frontend. It fetches weather data from the OpenWeatherMap API and relevant background images from the Unsplash API using server-side API keys, processes the data, and returns a combined, structured response to the frontend.

This approach ensures API keys are kept confidential and provides a simplified interface for the frontend application.

## Features (MVP)

*   **Static File Serving:** Serves the frontend application files.
*   **API Endpoint:** Provides a `/api/weather` endpoint to fetch weather and image data.
*   **OpenWeatherMap Integration:** Fetches current weather data based on city name or geographical coordinates.
*   **Unsplash Integration:** Fetches relevant landscape background images based on the location (city or country as fallback).
*   **Secure API Key Handling:** Uses environment variables (`.env` file) to manage sensitive API keys.
*   **Data Aggregation & Filtering:** Combines and filters data from external APIs before sending it to the frontend, optimizing the payload.
*   **CORS Enabled:** Configured to allow requests from the frontend origin.

## Technology Stack

*   Node.js
*   Express.js
*   Axios (for making HTTP requests to external APIs)
*   dotenv (for environment variable management)
*   Cors (for enabling Cross-Origin Resource Sharing)

## Prerequisites

*   Node.js (LTS version recommended, e.g., v18 or later)
*   npm (usually included with Node.js) or yarn
*   Git (for cloning the repository)
*   API Keys:
    *   OpenWeatherMap API Key
    *   Unsplash Access Key

## Installation

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-folder>/backend # Navigate to the backend directory
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    or if using yarn:
    ```bash
    yarn install
    ```

## Environment Variables

This application requires API keys from external services. These should be stored in an environment file.

1.  **Create a `.env` file** in the root of the `/backend` directory.
2.  **Add the following variables** to the `.env` file, replacing the placeholder values with your actual keys:

    ```dotenv
    # .env

    # Server port (optional, defaults to 5500)
    PORT=5500

    # API Keys (Required)
    OPENWEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
    UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_ACCESS_KEY
    ```

3.  **Important:** Ensure the `.env` file is added to your `.gitignore` file to prevent accidentally committing your secret keys.

## Running the Application

*   **Development Mode (with auto-reload using nodemon):**
    ```bash
    npm run dev
    ```
*   **Production Mode:**
    ```bash
    npm start
    ```

The server will start, typically on `http://localhost:5500` (or the port specified in your `.env` file). You can then access the frontend application by visiting this URL in your browser.

## API Endpoint

### Get Weather and Image Data

*   **URL:** `/api/weather`
*   **Method:** `POST`
*   **Headers:** `Content-Type: application/json`
*   **Request Body:**
    *   Requires a JSON object specifying the location type and value.
    *   **Example (By City):**
        ```json
        {
          "type": "city",
          "value": "London"
        }
        ```
    *   **Example (By Coordinates):**
        ```json
        {
          "type": "coords",
          "value": {
            "lat": 51.5074,
            "lon": -0.1278
          }
        }
        ```
*   **Success Response (200 OK):**
    *   Returns a JSON object containing filtered weather data and image details.
    *   **Example:**
        ```json
        {
          "weather": {
            "city": "London",
            "country": "GB",
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d",
            "temperature": 15.7,
            "feelsLike": 15.1,
            "humidity": 75,
            "windSpeed": 3.6 
          },
          "image": {
            "unsplashImageUrl": "https://images.unsplash.com/...",
            "name": "Photographer Name",
            "unsplash_link": "https://unsplash.com/@photographer"
          }
        }
        ```
*   **Error Responses:**
    *   `400 Bad Request`: If the request body `type` is invalid.
    *   `500 Internal Server Error`: If fetching data from OpenWeatherMap or Unsplash fails, or another server error occurs. The response body may contain an `error` message.
    *   *(Potential)* `404 Not Found`: If OpenWeatherMap cannot find the specified city. (Error handling might need refinement to pass this specific status).


## License

MIT