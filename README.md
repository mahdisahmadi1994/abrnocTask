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

  ## Technologies Used

- **Node.js** (version 14.x or higher)
- **Express.js** (web framework)
- **PostgreSQL** (database)
- **TypeORM** (ORM for database interactions)
- **dotenv** (for managing environment variables)
- **axios** (for making HTTP requests to OpenWeatherMap API)
- **class-validator** and **class-transformer** (for validation)

## Environment Setup

### 1. Clone the repository

```bash
git clone https://github.com/mahdisahmadi1994/abrnocTask.git
cd abrnocTask
```
### 2. Install dependencies

Run the following command to install all the necessary dependencies:

```bash
npm install -y
```

### 3. Set up environment variables

Create a `.env` file in the root directory of the project and add the following variables:

```env
PORT=3333
JWT_SECRET=my_jwt_secret
DB_USER="username"
DB_HOST="host"
DB_NAME="dbname"
DB_PORT=5432
DB_PASSWORD="password"
API_KEY= "api_key from OpenWeatherMap API"

REDIS_HOST= "localhost"
REDIS_PORT= 6379
```

