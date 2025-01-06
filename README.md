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
### 4. Run the application

To start the server, run the following command in your terminal:

```bash
npm run server
```
### 5. Database Schema

The application uses a PostgreSQL database to store the weather data. The database schema for storing weather data includes the following fields:

- **id** (UUID, primary key): Unique identifier for each weather record.
- **cityName** (string): The name of the city.
- **country** (string): The country of the city.
- **temperature** (float): Current temperature in the city (in Celsius).
- **description** (string): Weather description (e.g., "clear sky").
- **humidity** (integer): Humidity percentage in the city.
- **windSpeed** (float): Wind speed in meters per second.
- **fetchedAt** (timestamp): Timestamp when the data was fetched from the OpenWeatherMap API.
- **createdAt** (timestamp): Timestamp when the weather record was created in the database.
- **updatedAt** (timestamp): Timestamp when the weather record was last updated in the database.

The database schema is managed using **TypeORM**, and the weather data is fetched from the **OpenWeatherMap API** and stored in the PostgreSQL database.


### 6. API Endpoints

The application exposes the following RESTful API endpoints:

- **GET /weather**
  - **Description**: Retrieve all stored weather records from the database.
  - **Response**: List of weather objects.

- **GET /weather/:id**
  - **Description**: Retrieve a single weather record by its internal ID.
  - **Response**: Weather object.

- **POST /weather**
  - **Description**: Fetch current weather data for a specified city from OpenWeatherMap and store it in the database.
  - **Request Body**:
    ```json
    {
      "cityName": "London",
      
    }
    ```
  - **Response**: The stored weather object.

- **PUT /weather/:id**
  - **Description**: Update information on an existing weather record in the database.
  - **Request Body**: Fields to update (e.g., temperature, description).
  - **Response**: The updated weather object.

- **DELETE /weather/:id**
  - **Description**: Remove a weather record from the database.
  - **Response**: Success message or status.

- **GET /weather/latest/:cityName**
  - **Description**: Retrieve the latest weather data for a specific city.
  - **Response**: The most recent weather object for the specified city.

### 7. Error Handling

The application implements comprehensive error handling for the following scenarios:

- **Invalid Routes**: Returns a 404 error for undefined endpoints.
- **Server Errors**: Returns a 500 error for unexpected server issues.
- **Validation Errors**: Returns a 400 error with validation messages for incorrect or missing data.
- **External API Errors**: Handles and relays errors from OpenWeatherMap (e.g., invalid city name, API rate limiting).

### 8. Documentation

The API is documented using **Swagger UI**. You can view the interactive API documentation by visiting:

[http://localhost:3333/api-docs](http://localhost:3333/api-docs)


### 9. Version Control

This project is versioned using **Git**. The repository is hosted on GitHub:  
[https://github.com/mahdisahmadi1994/abrnocTask](https://github.com/mahdisahmadi1994/abrnocTask)

