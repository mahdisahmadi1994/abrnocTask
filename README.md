# abrnocTask

# Weather CRUD API
This project is a backend application that serves as an intermediary between a client and the OpenWeatherMap API. It fetches weather data for specified cities, stores it in a PostgreSQL database, and exposes RESTful endpoints for clients to interact with this data.

## Features

- Fetches weather data from the OpenWeatherMap API.
- Stores the weather data in a PostgreSQL database.
- Exposes RESTful API endpoints for clients to interact with the weather data.
- Implements error handling for invalid routes, server errors, validation errors, and external API errors.
- Integrates Swagger UI for interactive API documentation.
- Validates incoming data using `class-validator` and `class-transformer` with TypeORM entities.
