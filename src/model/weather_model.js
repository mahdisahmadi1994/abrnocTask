import { EntitySchema } from "typeorm";

export class Weather{
    constructor(cityName, country, temperature, description, humidity, windSpeed, fetchedAt){
        this.cityName = cityName;
        this.country = country;
        this.temperature = temperature;
        this.description = description;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.fetchedAt = fetchedAt;
    }}

export const WeatherEntity = new EntitySchema({
    name: "weather_data",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: true,
        },
        city_name: {
            type: "varchar",
            nullable: false,
        },
        country: {
            type: "varchar",
            nullable: false,
        },
        temperature: {
            type: "double precision",
            nullable: false,
        },
        description: {
            type: "varchar",
        },
        humidity: {
            type: "integer",
            nullable: false,
        },
        wind_speed: {
            type: "double precision",
            nullable: false,
        },
        fetched_at: {
            type: "timestamp",
            nullable: false,
        },
        created_at:{
            type: "timestamp",
            
        },
        updated_at:{
            type: "timestamp",
            
        },


    },
});

