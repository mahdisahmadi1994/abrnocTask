import CreateWeatherDTO from "../validators/weather_validator.js";
import { WeatherEntity, Weather } from "../model/weather_model.js";
import { api_key } from "../config/env.js";
import axios from 'axios';
import { getRepository } from "typeorm";





const fetchWeatherData = async (cityName, country) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Weather data API error: ${error.response.data.message}`);
    } else if (error.request) {
        throw new Error("No response received from Weather data API");
    } else {
        throw new Error("Unexpected error occurred while fetching weather data");
    }
}
};


const fetchWeatherForecast = async (cityName) => {
  try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}&units=metric`;
      const response = await axios.get(url);
      return response.data.list.map((item) => ({
          datetime: item.dt_txt,
          temperature: item.main.temp,
          description: item.weather[0].description,
          windSpeed: item.wind.speed,
          humidity: item.main.humidity,
      }));
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to fetch weather forecast from OpenWeatherMap: ${error.response.data.message}`);
  } else if (error.request) {
      throw new Error("No response received for weather forecast request");
  } else {
      throw new Error("Unexpected error occurred while fetching weather forecast");
  }
}
};


const getAllWeather = async (request, reply) => {
  try {
    const weatherRepository = getRepository(WeatherEntity);
    const weatherRecords = await weatherRepository.find({
      order: { created_at: "DESC" } 
    });

    if (weatherRecords.length === 0) {
      return reply.status(404).send({ error: "No weather records found" });
    }

    return reply.send({ data: weatherRecords });

  } catch (error) {
    console.error("Database error", error);
    return reply.status(500).send({ error: "Error fetching weather records" });
  }
};


const getWeatherById = async (request, reply) => {
  const { id } = request.params;

  if (!id) {
      return reply.status(400).send({ error: "ID parameter is required" });
  }

  try {
      const weatherRepository = getRepository(WeatherEntity);
      const weatherRecord = await weatherRepository.findOne({ where: { id } });

      if (!weatherRecord) {
          return reply.status(404).send({ error: "Weather record not found" });
      }

      return reply.send({ data: weatherRecord });

  } catch (error) {
      console.error("Database error:",error);
      return reply.status(500).send({ error: "Error fetching weather record" });
  }
};



const createWeather = async (request, reply) => {
    const { cityName, fetchForecast = false } = request.body;
  
    if (!cityName) {
      return reply.status(400).send({ error: "City name is required" });
    }

    const createWeatherDTO = new CreateWeatherDTO(cityName, fetchForecast);
    const validationErrors = await createWeatherDTO.validate();
    if (validationErrors) {
        return reply.status(400).send({ errors: validationErrors });
    }

    try {
        // Fetch the weather data from OpenWeatherMap API
        const weatherData = await fetchWeatherData(cityName);
        const { temp, humidity } = weatherData.main;
        const description = weatherData.weather[0].description;
        const windSpeed = weatherData.wind.speed;
        const { name: city, sys: { country: countryCode } } = weatherData;
        const fetchedAt = new Date().toISOString();


        const WeatherRepository = getRepository(WeatherEntity);
        const weatherEntity = WeatherRepository.create({
          city_name: city,
          country: countryCode,
          temperature: temp,
          description: description,
          humidity: humidity,
          wind_speed: windSpeed,
          fetched_at: fetchedAt,
      });

      const savedWeather = await WeatherRepository.save(weatherEntity);

      const response = { weather: savedWeather };
      
        if (fetchForecast) {
            const forecastData = await fetchWeatherForecast(cityName);
            response.forecast = forecastData;
        }
  
      return reply.send({ data: response });
  
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Error creating weather record" });
    }
  };

  const updateWeather = async (request, reply) => {
    const { id } = request.params;
    const { temperature, description } = request.body;

    if (!id || !temperature || !description) {
        return reply.status(400).send({ error: "ID, temperature, and description are required" });
    }

    try {
        const weatherRepository = getRepository(WeatherEntity);
        const weatherRecord = await weatherRepository.findOne({ where: { id } });

        if (!weatherRecord) {
            return reply.status(404).send({ error: "Weather record not found" });
        }

        weatherRecord.temperature = temperature;
        weatherRecord.description = description;
        weatherRecord.updated_at = new Date().toISOString();

        const updatedWeather = await weatherRepository.save(weatherRecord);

        return reply.send({ data: { weather: updatedWeather } });

    } catch (error) {
        console.error("Database error:",error);
        return reply.status(500).send({ error: "Error updating weather record" });
    }
};

const deleteWeather = async (request, reply) => {
  const { id } = request.params;
  
  if (!id) {
      return reply.status(400).send({ error: "ID parameter is required" });
  }

  try {
      const weatherRepository = getRepository(WeatherEntity);
      const weatherRecord = await weatherRepository.findOne({ where: { id } });

      if (!weatherRecord) {
          return reply.status(404).send({ error: "Weather record not found" });
      }

      await weatherRepository.remove(weatherRecord);

      return reply.send({ data: { message: "Weather record deleted successfully" } });

  } catch (error) {
      console.error("Database error:",error);
      return reply.status(500).send({ error: "Error deleting weather record" });
  }
};
  

const getLatestWeather = async (request, reply) => {
  const { cityName } = request.params;
  
  if (!cityName) {
      return reply.status(400).send({ error: "City name is required" });
  }

  try {
      const weatherRepository = getRepository(WeatherEntity);
      const latestWeather = await weatherRepository.findOne({
          where: { city_name: cityName },
          order: { created_at: "DESC" }
      });

      if (!latestWeather) {
          return reply.status(404).send({ error: "Weather record not found" });
      }

      return reply.send({ data: { weather: latestWeather } });

  } catch (error) {
      console.error("Databas error: ",error);
      return reply.status(500).send({ error: "Error fetching latest weather record" });
  }
};

  export default {
    getAllWeather,
    getWeatherById,
    createWeather,
    updateWeather,
    deleteWeather,
    getLatestWeather
  };
